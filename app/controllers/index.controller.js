let express = require('express');
let router = express.Router();
let { Book } = require("../models/schemas");
/* GET / */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'My Library', content: "index", errors: {}, user: {}});
});

router.post('/login', function(req, res, next) {
  User.authenticate(req.body.username, req.body.password, function(err, user){
    if(err || !user){
      res.render('layout', { title: 'My Library', content: "index", errors: {}, user: {}});
    }else{
      req.session.userId = user._id;
      res.redirect(301, '/books');
    }
  });
});

router.get('/books', function(req, res, next) {
  res.render('layout', { title: 'My Library', content: "index" });
});


/* GET /api/books/ */
router.get('/api/books', function(req, res, next) {
  Book.find().exec((err, books) => {
    if(err){
      res.json({success: false, message: `Failed with error ${err}`});
    }else{
      res.write(JSON.stringify(books));
      res.end();
    }
  })
});

router.post('/api/books/create', function(req, res, next) {
  new Book(req.body).save((err) =>{
    if(err){
      res.json({success: false, message: `Failed with error ${err}`});
    }else {
      res.end();
    }
  })
});

router.put('/api/books/:id/update', function(req, res, next) {
  Book.findById(req.params.id, (err, book) => {
    if(err){
      res.json({success: false, message: `Failed with error ${err}`});
    }else {
      Object.assign(book, req.body);
      book.save((err) =>{
        if(err){
          res.json({success: false, message: `Failed with error ${err}`});
        }else {
          res.end();
        }
      });
    }
  });
});

router.delete('/api/books/:id/delete', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.json({success: false, message: `Failed with error ${err}`});
    }else {
      res.end();
    }
  });
});

module.exports = router;

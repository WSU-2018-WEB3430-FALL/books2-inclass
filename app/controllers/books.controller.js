let express = require('express');
let router = express.Router();
const requireLogin = require("../helpers/require_login");
let { Book, User } = require("../models/schemas");

router.get('/books', requireLogin, function(req, res, next) {
  res.render('layout', { title: 'My Library', content: "books/index", errors: {}, user: {}});
});

/* GET /api/books/ */
router.get('/api/books', requireLogin, function(req, res, next) {
  Book.find().exec((err, books) => {
    if(err){
      res.json({success: false, message: `Failed with error ${err}`});
    }else{
      res.write(JSON.stringify(books));
      res.end();
    }
  })
});

router.post('/api/books/create', requireLogin, function(req, res, next) {
  new Book(req.body).save((err) =>{
    if(err){
      res.json({success: false, message: `Failed with error ${err}`});
    }else {
      res.end();
    }
  })
});

router.put('/api/books/:id/update', requireLogin, function(req, res, next) {
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

router.delete('/api/books/:id/delete', requireLogin, function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.json({success: false, message: `Failed with error ${err}`});
    }else {
      res.end();
    }
  });
});

module.exports = router;

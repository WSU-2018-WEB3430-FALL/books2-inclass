let express = require('express');
let router = express.Router();
let { Book } = require("../models/schemas");
/* GET / */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'My Library', content: "index" });
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

module.exports = router;

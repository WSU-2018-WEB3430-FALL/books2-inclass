let express = require('express');
let router = express.Router();
let { Book, User } = require("../models/schemas");
/* GET / */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'My Library', content: "index", errors: {}, user: {}});
});

router.post('/login', function(req, res, next) {
  User.authenticate(req.body.username, req.body.password, function(err, user){
    if(err || !user){
      res.render('layout', { title: 'My Library', content: "index", errors: {}, user});
    }else{
      req.session.userId = user._id;
      res.redirect(301, '/books');
    }
  });
});

router.post('/logout', function(req, res, next) {
  if(req.session && req.session.userId){
    console.log("Logged in - about to destroy")
    req.session.destroy(function(err){
      if(err) next(err);
      else res.redirect(301, "/");
    });
  }else{
    console.log("no session")
    res.redirect(301, "/");
  }
});
module.exports = router;

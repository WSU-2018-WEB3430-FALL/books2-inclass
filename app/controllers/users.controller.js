let express = require('express');
let router = express.Router();
let {User} = require("../models/schemas");

/* GET /users/ -> index.ejs */
router.get('/', function(req, res, next) {
  User.find().exec((err, users) => {
    console.log(users);
      res.render('layout', { title: 'My Library', content: "users/index", users });
  })
});

/* GET  /users/new -> new.ejs */
router.get('/new', function(req, res, next) {
  res.render('layout', { title: 'My Library', content: "users/new", errors: {}, user: {}});
});

/* GET /posts/:id -> view.ejs */
// router.get('/:id', function(req, res, next) {
//   Post.findById(req.params.id, (err, post) => {
//       res.render('layout', { title: 'My Blog', content: "posts/view", post });
//   })
// });

/* GET  /users/create */
router.post('/create', function(req, res, next) {
  new User(req.body).save((err) =>{
      if(err){
        res.render('layout', { title: 'My Library', content: "users/new", errors: err.errors, user: req.body });
      }else {
        req.flash('success', "User has been created successfully.");
        res.redirect(301, "/users/");
      }
  })
});

/* GET  /users/:id/edit -> edit.ejs */
router.get('/:id/edit', function(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if(err){
      res.render('layout', { title: 'My Library', content: "users/edit", errors: err.errors, user });
    }else{
      res.render('layout', { title: 'My Library', content: "users/edit", errors: {}, user });
    }
  })
});

/* GET  /users/:id/update */
router.post('/:id/update', function(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    Object.assign(user, req.body);
    user.save((err) =>{
      if(err){
        res.render('layout', { title: 'My Library', content: "users/edit", errors: err.errors, user });
      }else{
        res.redirect(301, "/users/");
      }
    });
  });
});

/* post  /users/:id/delete */
router.post('/:id/delete', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, (err) => {
    res.redirect(301, "/users/");
  });
});

module.exports = router;

let express = require('express');
let router = express.Router();
let {Post} = require("../models/schemas");

/* GET /posts/ -> index.ejs */
router.get('/', function(req, res, next) {
  Post.find().exec((err, posts) => {
      res.render('layout', { title: 'My Blog', content: "posts/index", posts });
  })
});

/* GET  /posts/new -> new.ejs */
router.get('/new', function(req, res, next) {
  res.render('layout', { title: 'My Blog', content: "posts/new", errors: {}, post: {}});
});

/* GET /posts/:id -> view.ejs */
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, (err, post) => {
      res.render('layout', { title: 'My Blog', content: "posts/view", post });
  })
});

/* GET  /posts/create */
router.post('/create', function(req, res, next) {
  new Post(req.body).save((err) =>{
      if(err){
        res.render('layout', { title: 'My Blog', content: "posts/new", errors: err.errors, post: req.body });
      }else {
        req.flash('success', "Post has been created successfully.");
        res.redirect(301, "/posts/");
      }
  })
});

/* GET  /posts/:id/edit -> edit.ejs */
router.get('/:id/edit', function(req, res, next) {
  Post.findById(req.params.id, (err, post) => {
      res.render('layout', { title: 'My Blog', content: "posts/edit", post });
  })
});

/* GET  /posts/:id/update */
router.post('/:id/update', function(req, res, next) {
  Post.findById(req.params.id, (err, post) => {
    Object.assign(post, req.body);
    post.save((err) =>{
      res.redirect(301, "/posts/");
    });
  });
});

/* post  /posts/:id/delete */
router.post('/:id/delete', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, (err) => {
    res.redirect(301, "/posts/");
  });
});

router.post("/:id/comments/create", function(req, res, next){
  Post.findById(req.params.id, (err, post) => {
    post.comments.push(req.body);
    post.save((err) =>{
      res.redirect(301, "/posts/" + post.id);
    });
  });
});

router.post("/:pid/comments/:cid/delete", function(req, res, next){
  Post.findById(req.params.pid, (err, post) => {
    post.comments.id(req.params.cid).remove();
    post.save((err) =>{
      res.redirect(301, "/posts/" + post.id);
    });
  });
});

module.exports = router;

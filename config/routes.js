module.exports = function(app){
  app.use('/', require('../app/controllers/index.controller'));
  app.use('/posts', require('../app/controllers/posts.controller'));
}
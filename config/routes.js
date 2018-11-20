module.exports = function(app){
  app.all("*", function(req, res, next){
    app.locals.loggedIn = req.session && req.session.userId ? true : false;
    next();
  });
  app.use('/', require('../app/controllers/index.controller'));
  app.use('/', require('../app/controllers/books.controller'));
  app.use('/users', require('../app/controllers/users.controller'));
}
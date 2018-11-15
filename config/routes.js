module.exports = function(app){
  app.use('/', require('../app/controllers/index.controller'));
  app.use('/users', require('../app/controllers/users.controller'));
}
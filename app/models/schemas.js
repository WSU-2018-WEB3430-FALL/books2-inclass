const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

userSchema.statics.authenticate = function(username, password, callback){
  this.findOne({username: username }).exec(function(err, user){
    if(err) return callback(err);
    if(!user) return callback("Invalid username");

    bcrypt.compare(password, user.password, function(err, result){
      if(result) return callback(null, user);
      else return callback("Invalid password")
    })
  });
}

userSchema.pre('save', function(next){
  let user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err) return next(err);

    user.password = hash;
    next();
  });
});

let bookSchema = new Schema ({
    title: String,
    author: String,
    isbn: String
});

module.exports.User = mongoose.model("User", userSchema);
module.exports.Book = mongoose.model("Book", bookSchema);
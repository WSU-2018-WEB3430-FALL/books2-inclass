const mongoose = require("mongoose");
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

userSchema.pre('save', function(next){
  let user = this;
});

let bookSchema = new Schema ({
    title: String,
    author: String,
    isbn: String
});

module.exports.Book = mongoose.model("Book", bookSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookSchema = new Schema ({
    title: String,
    author: String,
    isbn: String
});

module.exports.Book = mongoose.model("Book", bookSchema);
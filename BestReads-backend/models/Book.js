const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  buyLink: { type: String, required: true },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;

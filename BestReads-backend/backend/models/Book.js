const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Book category (e.g., fiction, mystery)
  title: { type: String, required: true }, // Real book title
  author: { type: String, required: true }, // Real author name
  image: { type: String, required: true }, // Real image URL
  buyLink: { type: String, required: true }, // Real purchase link
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;

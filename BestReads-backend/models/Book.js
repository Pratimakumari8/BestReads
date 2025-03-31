const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  description: { type: String },
  purchaseLink: { type: String },
  imageUrl: { type: String }, // Optional: Cover Image URL
  isBookOfTheMonth: { type: Boolean, default: false }, // Add this field
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

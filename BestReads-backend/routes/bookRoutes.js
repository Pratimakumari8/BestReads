const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");
const Category = require("../models/Category"); // Import Category model

const router = express.Router();

// 📚 Get books with pagination and category filtering
router.get("/", async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Show 10 books per page
    const skip = (page - 1) * limit;

    let query = {};

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        console.log("Category not found:", category); // Debug log
        return res.status(400).json({ message: "Category not found" });
      }
      query.category = categoryDoc._id; // Use ObjectId instead of name
    }

    const books = await Book.find(query)
      .sort({ title: 1 }) // Sort alphabetically by title
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments(query);

    if (!books.length) {
      console.log("No books found for query:", query); // Debug log
      return res.status(404).json({ message: "No books found for this category" });
    }

    res.json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching books:", error.message); // Log error message
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Endpoint to fetch the Book of the Month
router.get('/book-of-the-month', async (req, res) => {
  try {
    const bookOfTheMonth = await Book.findOne({ isBookOfTheMonth: true });
    if (!bookOfTheMonth) {
      return res.status(404).json({ message: 'Book of the month not found.' });
    }
    res.json(bookOfTheMonth);
  } catch (error) {
    console.error('Error fetching Book of the Month:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;

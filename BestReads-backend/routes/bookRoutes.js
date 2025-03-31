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
    const limit = 5; // Show 5 books per page
    const skip = (page - 1) * limit;

    let query = {};

    // ✅ Fix: Convert category name to ObjectId
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });

      if (!categoryDoc) {
        console.log("Category not found:", category); // Debug log
        return res.status(400).json({ message: "Category not found" });
      }

      query.category = categoryDoc._id; // Use ObjectId instead of name
    }

    console.log("Query:", query); // Debug log
    const books = await Book.find(query)
      .sort({ sales: -1 }) // Sort by most sold
      .skip(skip)
      .limit(limit);

    console.log("Books fetched:", books); // Debug log
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
    console.error("Error fetching books:", error); // Debug log
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports = router;

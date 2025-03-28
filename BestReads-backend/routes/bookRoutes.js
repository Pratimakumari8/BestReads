const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// 📚 Get books with pagination
router.get("/", async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Show 5 books per page
    const skip = (page - 1) * limit;

    // Build query to filter books by category if provided
    let query = {};
    if (category) {
      query.category = category; // Assuming "category" is a field in Book model
    }

    // Fetch paginated books
    const books = await Book.find(query)
      .sort({ sales: -1 }) // Sort by most sold (or use { rating: -1 } for highest rated)
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports = router;

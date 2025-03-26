const express = require("express");
const Book = require("../models/Book");
const Category = require("../models/Category");

const router = express.Router();

// 📚 Get top 10 books by category
router.get("/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    // Find category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find top 10 books for the category
    const books = await Book.find({ category: category._id }).limit(10);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

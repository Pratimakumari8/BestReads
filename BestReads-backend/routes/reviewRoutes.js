const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// 📝 Get reviews for a book with pagination
router.get("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Show 5 reviews per page
    const skip = (page - 1) * limit;

    // Fetch paginated reviews for a book
    const reviews = await Review.find({ bookId })
      .sort({ createdAt: -1 }) // Show latest reviews first
      .skip(skip)
      .limit(limit);

    const totalReviews = await Review.countDocuments({ bookId });

    res.json({
      reviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

module.exports = router;

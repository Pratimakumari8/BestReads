const mongoose = require("mongoose");
const Book = require("../models/Book");
const express = require("express");
const app = express();

// Replace with your MongoDB connection string
const MONGO_URI = "your_mongodb_connection_string";

async function setBookOfTheMonth() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Check if a book with isBookOfTheMonth: true already exists
    let book = await Book.findOne({ isBookOfTheMonth: true });

    if (!book) {
      // If no such book exists, create one
      book = new Book({
        title: "Default Book of the Month",
        author: "Default Author",
        category: "default_category_id", // Replace with a valid category ID
        description: "This is the default book of the month.",
        purchaseLink: "https://example.com",
        imageUrl: "https://example.com/default-image.jpg",
        isBookOfTheMonth: true,
      });
      await book.save();
      console.log("Book of the Month created:", book);
    } else {
      console.log("Book of the Month already exists:", book);
    }
  } catch (error) {
    console.error("Error setting Book of the Month:", error);
  } finally {
    mongoose.connection.close();
  }
}

setBookOfTheMonth();

// Add this route to fetch the Book of the Month
app.get("/api/book-of-the-month", async (req, res) => {
  try {
    const book = await Book.findOne({ isBookOfTheMonth: true });
    if (!book) {
      return res.status(404).json({ error: "Book of the month not found." });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start the server (if not already started)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

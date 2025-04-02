const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Book'); // Import the Book model

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bestreads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors()); // Enable CORS for all routes

// API to fetch books by category
app.get('/books/:category', async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });

    if (!books.length) {
      return res.status(404).json({ message: 'No books found in this category' });
    }

    res.json(
      books.map((book) => ({
        title: book.title, // Real book title
        author: book.author, // Real author name
        image: book.image, // Real book image
        buyLink: book.buyLink, // Real purchase link
      }))
    );
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

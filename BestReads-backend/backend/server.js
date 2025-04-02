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

// API to fetch books by category with query parameters
app.get('/api/books', async (req, res) => {
  try {
    const { category, limit } = req.query; // Extract query parameters
    console.log(`Fetching books for category: ${category}, limit: ${limit}`); // Log the query parameters

    if (!category) {
      return res.status(400).json({ message: 'Category is required' }); // Handle missing category
    }

    // Query the category as a string (case-insensitive)
    const query = { category: category.toLowerCase() };

    console.log('Query:', query);

    const books = await Book.find(query).limit(parseInt(limit) || 10); // Apply limit if provided, default to 10

    if (!books.length) {
      console.log('No books found for query:', query); // Log if no books are found
      return res.status(404).json({ message: 'No books found in this category' });
    }

    console.log('Books fetched:', books); // Log the books found
    res.json(
      books.map((book) => ({
        title: book.title,
        author: book.author,
        description: book.description, // Include description in the response
        image: book.image,
        buyLink: book.buyLink,
      }))
    );
  } catch (error) {
    console.error('Error fetching books:', error); // Log the error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

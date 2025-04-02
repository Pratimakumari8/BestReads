const axios = require('axios');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const fetchBooksFromGoogleDocs = async (category = '', limit = 10) => {
  try {
    console.log('Fetching books with params:', { category, limit }); // Debug log
    const response = await axios.get(`http://localhost:5000/api/books`, {
      params: { category, limit },
    });
    console.log('Data from Google Docs API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Google Docs API:', error);
    return null;
  }
};

const fetchBooksByCategory = async (categoryId) => {
  try {
    console.log('Querying books for category:', categoryId);

    // Check if categoryId is a valid ObjectId
    const query = ObjectId.isValid(categoryId)
      ? { category: new ObjectId(categoryId) }
      : { category: categoryId }; // Fallback to string if not an ObjectId

    console.log('Query:', query);

    const books = await Book.find(query);
    console.log('Books fetched:', books);

    if (books.length === 0) {
      console.log('No books found for query:', query);
    }

    return books;
  } catch (error) {
    console.error('Error fetching books by category:', error);
    return [];
  }
};

module.exports = { fetchBooksFromGoogleDocs, fetchBooksByCategory };

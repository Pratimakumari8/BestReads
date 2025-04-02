const mongoose = require('mongoose');
const Book = require('./models/Book');
const fetchBooksFromGoogleDocs = require('./fetchBooks');

mongoose.connect('mongodb://127.0.0.1:27017/bestreads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const saveBooksToMongoDB = async () => {
  const books = await fetchBooksFromGoogleDocs();
  if (!books) {
    console.log('No books fetched, skipping database update.');
    return;
  }

  try {
    for (const bookData of books) {
      const formattedBook = {
        title: bookData.title || 'Unknown Title',
        author: bookData.author || 'Unknown Author',
        category: bookData.category || 'Unknown Category',
        description: bookData.description || 'No description available',
        buyLink: bookData.purchaseLink || 'No link available',
        image: bookData.imageUrl || 'https://via.placeholder.com/150', // Placeholder if missing
      };

      await Book.updateOne(
        { title: formattedBook.title }, // Match by title
        { $set: formattedBook }, // Update fields
        { upsert: true } // Insert if not found
      );
    }
    console.log('Books saved successfully');
  } catch (err) {
    console.error('Error saving books:', err);
  } finally {
    mongoose.connection.close();
  }
};

saveBooksToMongoDB();

const mongoose = require('mongoose');
const Book = require('../models/Book');

const addBookOfTheMonth = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bestreads', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing Book of the Month
    await Book.updateMany({ isBookOfTheMonth: true }, { isBookOfTheMonth: false });

    // Add a new Book of the Month
    const book = new Book({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic novel of the Jazz Age.',
      image: 'https://example.com/gatsby.jpg',
      isBookOfTheMonth: true,
    });

    await book.save();
    console.log('Book of the Month added successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding Book of the Month:', error);
    mongoose.connection.close();
  }
};

addBookOfTheMonth();

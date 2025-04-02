const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb://127.0.0.1:27017/bestreads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const updateCategoriesToStrings = async () => {
  try {
    const books = await Book.find({});
    for (const book of books) {
      if (mongoose.isValidObjectId(book.category)) {
        book.category = book.category.toString(); // Convert ObjectId to string
        await book.save();
      }
    }
    console.log('Categories updated to strings successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error updating categories:', err);
    mongoose.connection.close();
  }
};

updateCategoriesToStrings();

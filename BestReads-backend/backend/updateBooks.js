const mongoose = require('mongoose');
const Book = require('./models/Book'); // Ensure the Book model exists in the models directory

mongoose.connect('mongodb://127.0.0.1:27017/bestreads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Add a timeout to avoid indefinite waiting
});

const updatedBooks = [
  {
    category: 'fiction',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description: 'A story about all the lives you could live.',
    purchaseLink: 'https://www.amazon.com/dp/0525559477',
    imageUrl: 'https://example.com/midnight-library.jpg',
  },
  {
    category: 'fiction',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    description: 'A lone astronaut must save Earth from disaster.',
    purchaseLink: 'https://www.amazon.com/dp/0593135202',
    imageUrl: 'https://example.com/project-hail-mary.jpg',
  },
  // Add more books as needed
];

async function updateBooks() {
  try {
    for (const book of updatedBooks) {
      await Book.updateOne(
        { title: book.title }, // Match by title
        { $set: book }, // Update fields
        { upsert: true } // Insert if not found
      );
    }
    console.log('Books updated successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error updating books:', err);
    mongoose.connection.close();
  }
}

updateBooks();

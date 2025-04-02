const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb://localhost:27017/bestreads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const books = [
  {
    category: 'fiction',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    image: 'https://example.com/midnight-library.jpg',
    buyLink: 'https://www.amazon.com/dp/0525559477',
  },
  {
    category: 'fiction',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    image: 'https://example.com/project-hail-mary.jpg',
    buyLink: 'https://www.amazon.com/dp/0593135202',
  },
  // Add more books as needed
];

Book.insertMany(books)
  .then(() => {
    console.log('Books inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => console.error('Error inserting books:', err));

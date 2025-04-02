const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('../models/Book');
const Category = require('../models/Category');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBooks = async () => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      console.log('No categories found. Please seed categories first.');
      process.exit(1);
    }

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

    await Book.deleteMany();
    const result = await Book.insertMany(books);

    console.log(`✅ ${result.length} Books seeded successfully!`);
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding books:', error);
    process.exit(1);
  }
};

seedBooks();

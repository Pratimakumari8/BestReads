const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("../models/Book");
const Category = require("../models/Category");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {});

const seedBooks = async () => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      console.log("No categories found. Please seed categories first.");
      process.exit(1);
    }

    const books = [];

    for (const category of categories) {
      for (let i = 1; i <= 10; i++) {
        books.push({
          title: `${category.name} Book ${i}`,
          author: `Author ${i}`,
          category: category._id,
          description: `A great ${category.name.toLowerCase()} book.`,
          purchaseLink: `https://example.com/${category.name.toLowerCase()}-book-${i}`,
          imageUrl: `https://via.placeholder.com/150?text=${category.name}+Book+${i}`,
        });
      }
    }

    await Book.deleteMany();
    const result = await Book.insertMany(books);

    console.log(`✅ ${result.length} Books seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding books:", error);
    process.exit(1);
  }
};

seedBooks();

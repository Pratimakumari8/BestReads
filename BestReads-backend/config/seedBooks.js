const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("../models/Book");
const Category = require("../models/Category");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBooks = async () => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      console.log("No categories found. Please seed categories first.");
      process.exit(1);
    }

    const books = [
      {
        category: "Fiction", // Match category name
        title: "The Midnight Library",
        author: "Matt Haig",
        image: "https://example.com/midnight-library.jpg",
        buyLink: "https://www.amazon.com/dp/0525559477",
        description: "A story about all the lives you could live.",
      },
      {
        category: "Fiction",
        title: "Project Hail Mary",
        author: "Andy Weir",
        image: "https://example.com/project-hail-mary.jpg",
        buyLink: "https://www.amazon.com/dp/0593135202",
        description: "A lone astronaut must save Earth from disaster.",
      },
      // Add more books for other categories
    ];

    await Book.deleteMany();

    for (const book of books) {
      const categoryDoc = categories.find((cat) => cat.name === book.category);
      if (!categoryDoc) {
        console.log(`Category not found for book: ${book.title}`);
        continue;
      }

      await Book.create({
        ...book,
        category: categoryDoc._id, // Link to Category ObjectId
      });
    }

    console.log("Books seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding books:", error);
    process.exit(1);
  }
};

seedBooks();

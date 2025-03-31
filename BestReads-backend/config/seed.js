const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../models/Category");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {});

const seedCategories = async () => {
  try {
    const categories = [
      { name: "Fiction", description: "Stories that may be inspired by real events but are not real." },
      { name: "Mystery", description: "Suspenseful books that keep you guessing." },
      { name: "Romance", description: "Love stories filled with emotions." },
      { name: "Science Fiction", description: "Futuristic, scientific, or space-related stories." },
      { name: "Fantasy", description: "Magical and supernatural elements in storytelling." },
      { name: "Self-Help", description: "Books to improve life skills and mindset." },
      { name: "Biography", description: "Life stories of famous personalities." },
      { name: "Horror", description: "Spooky and thrilling books." },
      { name: "Thriller", description: "Action-packed and high-stakes storytelling." },
      { name: "History", description: "Books about historical events and people." },
      { name: "Poetry", description: "Creative and expressive writing in verse form." },
      { name: "Philosophy", description: "Books exploring fundamental questions of life and knowledge." },
      { name: "Business & Finance", description: "Books on entrepreneurship, finance, and management." },
      { name: "Health & Fitness", description: "Books on physical and mental well-being." },
      { name: "Cookbooks", description: "Books with recipes and culinary techniques." },
    ];

    await Category.deleteMany(); // Clear existing categories
    const result = await Category.insertMany(categories);

    console.log(`✅ ${result.length} Categories seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();

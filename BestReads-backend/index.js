const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BestReads API is running...");
});

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




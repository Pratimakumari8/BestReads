import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchBooksByCategory } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Fiction");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  // Fetch books based on selected category
  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooksByCategory(category);
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBooks();
  }, [category]);

  // Search functionality
  useEffect(() => {
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Top Books in {category}</h2>

      {/* Category Selection Dropdown */}
      <div className="row mb-3">
        <div className="col-md-4 mx-auto">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option>Loading categories...</option>
            )}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

{filteredBooks.map((book) => (
  <div className="col-md-4 mb-4" key={book._id}>
    <div className="card">
      <img
        src={book.image}
        className="card-img-top"
        alt={book.title}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          {book.description.length > 100
            ? book.description.substring(0, 100) + "..."
            : book.description}
        </p>
        <Link to={`/book/${book._id}`} className="btn btn-info">
          View Details
        </Link>
      </div>
    </div>
  </div>
))}

      {/* Books Display */}
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book._id}>
              <div className="card">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    {book.description.length > 100
                      ? book.description.substring(0, 100) + "..."
                      : book.description}
                  </p>
                  <a
                    href={book.link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
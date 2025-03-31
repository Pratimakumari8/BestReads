import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBooksByCategory } from "../api";

const BooksList = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooksByCategory(categoryName, 10); // Fetch 10 books
        console.log("API Response:", data); // Debug log to inspect API response
        setBooks(Array.isArray(data.books) ? data.books : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch books.");
        setLoading(false);
      }
    };
    getBooks();
  }, [categoryName]);

  if (loading) {
    return <p className="text-center">Loading books...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center display-4 fw-bold">{categoryName} Books</h1> {/* Display category name */}
      <div className="row mt-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="col-md-4 mb-4" key={book._id || book.id || book.title}> {/* Use a fallback key */}
              <div className="card h-100">
                <img
                  src={book.image || "https://via.placeholder.com/150"} // Fallback image if book.image is missing
                  alt={book.title || "Book Image"} // Fallback alt text
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{book.title || "Untitled Book"}</h5> {/* Fallback title */}
                  <p className="card-text">
                    {book.description
                      ? book.description.substring(0, 100) + "..."
                      : "No description available."}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No books found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default BooksList;

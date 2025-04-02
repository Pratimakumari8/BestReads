import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBooksByCategory } from "../api";

const BooksList = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooksByCategory(categoryName, 10); // Fetch top 10 books
        setBooks(Array.isArray(data.books) ? data.books : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err.message); // Log error message
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
      <h1 className="text-center display-4 fw-bold">{categoryName} - Top 10 Books</h1>
      <div className="row mt-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="col-md-4 mb-5" key={book._id || book.id || book.title}>
              <div className="card h-100 antique-border">
                <img
                  src={book.image || "https://via.placeholder.com/150"} // Use `image` from the backend
                  alt={book.title || "Book Image"}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{book.title || "Untitled Book"}</h5>
                  <p className="card-text">
                    {book.description
                      ? book.description.substring(0, 100) + "..."
                      : "No description available."}
                  </p>
                  <Link
                    to={`/author/${book.author}`} // Link to the author's page
                    className="btn btn-outline-dark btn-sm mb-2"
                  >
                    About the Author
                  </Link>
                  <a
                    href={book.buyLink} // Use `buyLink` from the backend
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark btn-sm"
                  >
                    Buy Now
                  </a>
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

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBookDetails } from "../api";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookDetails = async () => {
      let response;
      try {
        response = await fetchBookDetails(bookId, { raw: true });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Unexpected Content-Type:", contentType);
          throw new Error("Invalid response format. Expected JSON.");
        }
        const data = await response.json();
        if (!data || data.error) {
          throw new Error(data?.error || "Book not found.");
        }
        setBook(data);
      } catch (err) {
        console.error("Error fetching book details:", err.message);
        setError(err.message || "Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };
    getBookDetails();
  }, [bookId]);

  if (loading) return <p className="text-center">Loading book details...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container mt-4 book-details">
      <h2 className="text-center">{book.title}</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src={book.image}
            alt={book.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <p>
            <strong>Author:</strong>{" "}
            <Link to={`/author/${book.authorId}`} className="author-link">
              {book.author}
            </Link>
          </p>
          <p><strong>Description:</strong> {book.description}</p>
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
  );
};

export default BookDetails;
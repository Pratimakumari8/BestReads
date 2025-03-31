import React, { useState, useEffect } from "react";
import { fetchBookDetails } from "../api";

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBookDetails = async (id) => {
      try {
        const bookDetails = await fetchBookDetails(id);
        if (!bookDetails) {
          console.warn("Book not found. Redirecting or showing a message.");
          // Handle the case where the book is not found (e.g., show a message or redirect)
          setError("Book not found.");
          return;
        }
        setBook(bookDetails);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("An error occurred while fetching book details.");
      }
    };

    getBookDetails(bookId);
  }, [bookId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
    </div>
  );
};

export default BookDetails;
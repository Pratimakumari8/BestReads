import React, { useEffect, useState } from 'react';

const FictionBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books') // Use full URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="book-list">
      <h2>Top 10 Fiction Books</h2>
      <div className="books">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img src={book.image} alt={book.title || 'Book Image'} />
            <h3>{book.title || 'Unknown Title'}</h3>
            <p>{book.author || 'Unknown Author'}</p> {/* Display author */}
            <a href={book.buyLink} target="_blank" rel="noopener noreferrer">
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FictionBooks;

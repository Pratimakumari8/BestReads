import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api";
import "../styles/booklist.css"; // Import custom styles

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/books?page=${page}`);
        const data = await response.json();
        setBooks(data.books);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]);

  if (loading) return <div className="text-center mt-5">Loading books...</div>;

  return (
    <div className="container">
      <h2 className="title">📚 Best Books</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-details">
              <h5 className="book-title">{book.title}</h5>
              <p className="book-author">{book.author}</p>
              <Link to={`/book/${book._id}`} className="btn">Read More</Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>⏪ Previous</button>
        <span className="page-info">Page {page} of {totalPages}</span>
        <button className="btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ⏩</button>
      </div>
    </div>
  );
};

export default BookList;

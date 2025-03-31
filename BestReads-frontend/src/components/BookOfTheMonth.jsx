import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api";
import "../styles/bookofthemonth.css"; // Add custom styles

const BookOfTheMonth = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookOfTheMonth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/book-of-the-month`);
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book of the month:", error);
        setLoading(false);
      }
    };

    fetchBookOfTheMonth();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading Book of the Month...</div>;
  if (!book) return <div className="text-center mt-5">No book selected for this month.</div>;

  return (
    <div className="botm-container">
      <h2 className="botm-title">📖 Book of the Month</h2>
      <div className="botm-card">
        <img src={book.image} alt={book.title} className="botm-image" />
        <div className="botm-details">
          <h3 className="botm-book-title">{book.title}</h3>
          <p className="botm-author">by {book.author}</p>
          <p className="botm-description">{book.description}</p>
          <Link to={`/book/${book._id}`} className="btn">Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default BookOfTheMonth;

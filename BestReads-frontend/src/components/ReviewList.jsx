import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
import "../styles/reviewlist.css"; // New styling

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reviews/${bookId}?page=${page}`);
        const data = await response.json();
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId, page]);

  if (loading) return <div className="text-center mt-5">Loading reviews...</div>;

  return (
    <div className="review-container">
      <h3 className="review-title">📖 Book Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} className="review-card">
          <p className="review-text">"{review.text}"</p>
          <p className="review-author">- {review.username}</p>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>⏪ Previous</button>
        <span className="page-info">Page {page} of {totalPages}</span>
        <button className="btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ⏩</button>
      </div>
    </div>
  );
};

export default ReviewList;

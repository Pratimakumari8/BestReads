import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ user: "", rating: 5, comment: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await fetch(`${API_BASE_URL}/books/details/${id}`);
        const bookData = await bookResponse.json();
        setBook(bookData);

        const reviewsResponse = await fetch(`${API_BASE_URL}/reviews/${id}`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setReview({ user: "", rating: 5, comment: "" });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!book) return <div className="text-center mt-5">Book not found.</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={book.image}
            alt={book.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-8">
          <h2>{book.title}</h2>
          <h5 className="text-muted">by {book.author}</h5>
          <p className="mt-3">{book.description}</p>
          <a href={book.link} className="btn btn-primary mt-3" target="_blank">
            Buy This Book
          </a>

          {/* Review Form */}
          <div className="mt-4">
            <h4>Add a Review</h4>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={review.user}
                  onChange={(e) =>
                    setReview({ ...review, user: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <select
                  className="form-select"
                  value={review.rating}
                  onChange={(e) =>
                    setReview({ ...review, rating: Number(e.target.value) })
                  }
                >
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Your Review"
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">
                Submit Review
              </button>
            </form>
          </div>

          {/* Display Reviews */}
          <div className="mt-4">
            <h4>Reviews</h4>
            {reviews.length > 0 ? (
              reviews.map((rev, index) => (
                <div key={index} className="border p-2 my-2">
                  <h6>
                    {rev.user} ⭐ {rev.rating}/5
                  </h6>
                  <p>{rev.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

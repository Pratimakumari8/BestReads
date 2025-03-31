import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api"; // Import the API function
import { Link } from "react-router-dom"; // Import Link for navigation

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories.");
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  if (loading) {
    return <p className="text-center">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center display-4 fw-bold">Explore Categories</h1>
      <div className="row mt-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="col-md-4 mb-5" key={category._id}> {/* Increased spacing with mb-5 */}
              <Link
                to={`/books/${category.name}`}
                className="category-card text-decoration-none"
              >
                <div
                  className="card p-4 text-center"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    border: "2px solid #d2b48c",
                    borderRadius: "10px",
                    marginBottom: "20px", // Added margin for spacing
                  }}
                >
                  <h5 className="fw-bold">{category.name}</h5>
                  <p className="card-text">
                    {category.description || "No description available."}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;

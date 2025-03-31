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
    <div className="container mt-4">
      <h2 className="text-center">📚 Categories</h2>
      <div className="row">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="col-md-4 mb-4" key={category._id}>
              <Link
                to={`/books/${category.name}`} // Navigate to the books list for the category
                className="text-decoration-none"
              >
                <div
                  className="card h-100"
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">
                      {category.description || "No description available."}
                    </p>
                  </div>
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

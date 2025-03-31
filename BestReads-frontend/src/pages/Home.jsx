import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/categories"); // Navigate to the categories page
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 fw-bold">Welcome to BestReads</h1>
      <p className="lead">Discover your next favorite book from our curated collection.</p>
      <button
        className="btn btn-lg btn-outline-dark mt-4 px-5 py-3"
        style={{
          borderRadius: "30px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
        onClick={handleExploreClick}
      >
        Let's Explore
      </button>
    </div>
  );
};

export default Home;

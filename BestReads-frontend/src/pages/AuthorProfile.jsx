import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

const AuthorProfile = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/authors/${authorId}`);
        const data = await response.json();
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author details:", error);
      }
    };

    fetchAuthorDetails();
  }, [authorId]);

  if (!author) return <div>Loading author details...</div>;

  return (
    <div className="author-profile">
      <h2>{author.name}</h2>
      <p>{author.bio}</p>
      <h3>Best-Selling Books:</h3>
      <ul>
        {author.books.map((book) => (
          <li key={book._id}>
            <img src={book.image} alt={book.title} />
            <p>{book.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorProfile;

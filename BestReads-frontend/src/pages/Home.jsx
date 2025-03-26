import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchBooksByCategory } from "../api";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("Fiction");

  useEffect(() => {
    loadBooks();
  }, [category]);

  const loadBooks = async () => {
    const data = await fetchBooksByCategory(category);
    setBooks(data);
  };

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <button onClick={logout}>Logout</button>

      <h2>Books</h2>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="Fiction">Fiction</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

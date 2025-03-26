import { useState, useEffect, useContext } from "react";
import { fetchBooksByCategory, addBook, updateBook, deleteBook } from "../api";
import { AuthContext } from "../context/AuthContext";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("Fiction"); // Default category
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadBooks();
  }, [category]);

  const loadBooks = async () => {
    const data = await fetchBooksByCategory(category);
    setBooks(data);
  };

  const handleAddOrUpdateBook = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      alert("Unauthorized action.");
      return;
    }

    const bookData = { title, author, category };
    if (editingBook) {
      await updateBook(editingBook._id, bookData, user.token);
    } else {
      await addBook(bookData, user.token);
    }
    setTitle("");
    setAuthor("");
    setEditingBook(null);
    loadBooks();
  };

  const handleDelete = async (bookId) => {
    if (!user || !user.token) {
      alert("Unauthorized action.");
      return;
    }
    await deleteBook(bookId, user.token);
    loadBooks();
  };

  return (
    <div>
      <h2>Manage Books</h2>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="Fiction">Fiction</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>

      <form onSubmit={handleAddOrUpdateBook}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <button type="submit">{editingBook ? "Update Book" : "Add Book"}</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => { setEditingBook(book); setTitle(book.title); setAuthor(book.author); }}>Edit</button>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBooks;

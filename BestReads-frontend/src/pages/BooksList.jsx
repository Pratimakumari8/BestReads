import { useEffect, useState } from "react";
import { fetchBooksByCategory } from "../api";
import { useParams } from "react-router-dom";

const BooksList = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooksByCategory(categoryName);
      setBooks(data);
    };
    getBooks();
  }, [categoryName]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{categoryName} Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {books.map((book) => (
          <div key={book._id} className="p-4 border rounded-lg">
            <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <a
              href={book.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm mt-2 inline-block"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;

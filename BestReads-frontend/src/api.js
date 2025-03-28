export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; 


export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

export const fetchBooksByCategory = async (categoryName) => {
  const response = await fetch(`${API_BASE_URL}/books/${categoryName}`);
  return response.json();
};

export const addBook = async (bookData, token) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Send token for authentication
    },
    body: JSON.stringify(bookData),
  });
  return response.json();
};

export const updateBook = async (bookId, bookData, token) => {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
  return response.json();
};

export const deleteBook = async (bookId, token) => {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};


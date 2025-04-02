export const API_BASE_URL = "http://localhost:5000/api"; // Ensure this is correct

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

export const fetchBooksByCategory = async (categoryName, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books?category=${categoryName}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched books:", data); // Debug log
    return data;
  } catch (error) {
    console.error("Error in fetchBooksByCategory:", error.message); // Log error message
    return { books: [] }; // Return an empty array if there's an error
  }
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

export const fetchBookDetails = async (id) => {
  try {
    console.log("Fetching book details for ID:", id); // Debug log
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Book with ID ${id} not found.`);
        return null; // Return null if the book is not found
      }
      throw new Error(`Error fetching book details: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchBookDetails:", error);
    throw error; // Throw the error to be handled by the calling code
  }
};


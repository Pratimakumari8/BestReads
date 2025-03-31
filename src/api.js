export const fetchBookDetails = (id) => {
  // Function implementation to fetch book details by ID
  // Example:
  return fetch(`/api/books/${id}`).then((response) => response.json());
};
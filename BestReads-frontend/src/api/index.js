export const fetchBookDetails = async (id) => {
  try {
    const response = await fetch(`/api/books/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

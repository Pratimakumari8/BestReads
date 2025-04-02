const axios = require('axios');

const fetchBooksFromGoogleDocs = async () => {
  try {
    const response = await axios.get('YOUR_GOOGLE_DOCS_API_URL'); // Replace with your Google Docs API URL
    console.log('Data from Google Docs API:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Google Docs API:', error);
    return null;
  }
};

module.exports = fetchBooksFromGoogleDocs;

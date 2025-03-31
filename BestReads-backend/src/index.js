import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Updated rendering logic
root.render(<App />); // Remove React.StrictMode temporarily
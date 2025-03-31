import { useState } from "react"; // Ensure this is correctly imported
import { useNavigate } from "react-router-dom"; // Ensure this is correctly imported
import { API_BASE_URL } from "../api"; // Ensure API_BASE_URL is defined in ../api

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${API_BASE_URL}/auth/signup`;
      console.log("API URL:", apiUrl); // Debug log
      console.log("Sending signup request:", { name, email, password }); // Debug log

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup error:", errorData.message); // Debug log
        alert(errorData.message || "An error occurred during signup.");
        return;
      }

      const data = await response.json();
      console.log("Signup successful:", data); // Debug log
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error); // Debug log
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

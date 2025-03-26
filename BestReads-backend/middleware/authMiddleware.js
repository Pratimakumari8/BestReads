const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from headers

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Add user info to request
    next(); // Proceed to next function
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = protect;

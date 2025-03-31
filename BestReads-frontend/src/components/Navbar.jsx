import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/signup">Signup</Link>
      {/* ...other links... */}
    </nav>
  );
};

export default Navbar;

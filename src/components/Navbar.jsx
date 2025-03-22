// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <img className="logo" src ="../images/feedback_logo.avif" alt="feedback" />
        <div>
           <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="">Events</Link>
        </div>
        </div>
        

      </div>
    </nav>
  );
};

export default Navbar;

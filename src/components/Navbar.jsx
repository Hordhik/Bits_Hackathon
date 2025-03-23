import { Link } from "react-router-dom";
import React from "react";
import logo from "/images/feedback_logo.avif";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo-container">
          <img className="logo" src={logo} alt="feedback" />
        </div>
        <h1 className="hed">Welcome to Real-time Feedback Platform</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="nav_end">
          <i className="fa-solid fa-bell nav_icons"></i>
          <i className="fa-solid fa-user nav_icons"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

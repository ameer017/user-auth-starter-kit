import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          Auth
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
        <FiMenu />
        </button>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="#">Login</Link>
          <Link to="#">Profile</Link>
          <Link to="#">Logout</Link>

          <Link to="/">
            <img className="profile-img" src="" alt="profile image" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

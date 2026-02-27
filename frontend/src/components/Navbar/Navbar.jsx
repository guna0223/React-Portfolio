import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  // Check if we're on a 404 page
  const is404Page = location.pathname === '/404' || location.pathname === '/not-found' || location.pathname === '*';

  return (
    <header>
      <nav className="navbar">
        <Link to="/">
          <a href="#home">
            <div className="nav-brand">
              <span className="brand-symbol">★</span>
              <span className="brand-text">PORTFOLIO</span>
            </div>
          </a>
        </Link>

        <ul className="nav-menu">
          <li>
            <a href="#home">
              <Link to="/" className="nav-link active">HOME</Link>
            </a>
          </li>
          <li>
            <a href="#about">
              <Link to="/about" className="nav-link">ABOUT</Link>
            </a>
          </li>
          <li>
            <a href="#skills">
              <Link to="/skills" className="nav-link">SKILLS</Link>
            </a>
          </li>
          <li>
            <a href="#service">
              <Link to="/services" className="nav-link">SERVICE</Link>
            </a>
          </li>
          <li>
            <a href="#project">
              <Link to="/projects" className="nav-link">PROJECT</Link>
            </a>
          </li>
          <li>
            <a href="#contact">
              <Link to="/contact" className="nav-link">CONTACT</Link>
            </a>
          </li>
        </ul>

        <div className="nav-cta">
          <Link to="/contact" className="cta-btn">
            <span className="arow">LET'S TALK</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

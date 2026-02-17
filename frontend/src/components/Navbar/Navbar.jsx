import React from "react";
import "../css/Navbar.css";
const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <a href="#">
          <div className="nav-brand">
            <span className="brand-symbol">⦿</span>
            <span className="brand-text">Portfolio</span>
          </div>
        </a>

        <ul className="nav-menu">
          <li>
            <a href="#home" className="nav-link active">Home</a>
          </li>
          <li>
            <a href="#about" className="nav-link">About</a>
          </li>
          <li>
            <a href="#skills" className="nav-link">Skills</a>
          </li>
          <li>
            <a href="#service" className="nav-link">Service</a>
          </li>
          <li>
            <a href="#project" className="nav-link">Project</a>
          </li>
          <li>
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>

        <div className="nav-cta">
          <a href="#contact" className="cta-btn">
            <span className="btn-symbol">✦</span>
            <span>Let's Talk</span>
          </a>
        </div>

        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

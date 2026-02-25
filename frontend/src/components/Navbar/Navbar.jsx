import React from "react";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <a href="#">
          <div className="nav-brand">
            <span className="brand-symbol">★</span>
            <span className="brand-text">PORTFOLIO</span>
          </div>
        </a>

        <ul className="nav-menu">
          <li>
            <a href="#home" className="nav-link active">HOME</a>
          </li>
          <li>
            <a href="#about" className="nav-link">ABOUT</a>
          </li>
          <li>
            <a href="#skills" className="nav-link">SKILLS</a>
          </li>
          <li>
            <a href="#service" className="nav-link">SERVICE</a>
          </li>
          <li>
            <a href="#project" className="nav-link">PROJECT</a>
          </li>
          <li>
            <a href="#contact" className="nav-link">CONTACT</a>
          </li>
        </ul>

        <div className="nav-cta">
          <a href="#contact" className="cta-btn">
            <span className="arow">LET'S TALK</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

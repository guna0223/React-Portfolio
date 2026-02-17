import React from "react";
import "../css/Footer.css"; 

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        {/* Brand Symbol */}
        <div className="footer-symbol">⦿</div>

        {/* Copyright */}
        <p>
          Cast in Mystic Fire © {new Date().getFullYear()} • Gunasekar
        </p>

        {/* Navigation Links */}
        <div className="footer-links">
          <a href="#home">| Home |</a>
          <span className="separator">✦</span>
          <a href="#about">| About |</a>
          <span className="separator">✦</span>
          <a href="#projects">| Projects |</a>
          <span className="separator">✦</span>
          <a href="#contact">| Contact |</a>
        </div>

        {/* ADDED: Social Links */}
        <div className="footer-socials">
          <a
            href="https://github.com/guna0223"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/gunasekar0223/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>

          <a
            href="mailto:gunasekar0223@gmail.com"
            aria-label="Email"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>

        {/* ADDED: Footer Note */}
        <small className="footer-note">
          Built with React • Designed & Developed by Me
        </small>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "../css/Footer.css"; 

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-item">
            <span className="status-icon">★</span>
            <span>PLAYER READY</span>
          </div>
          <span className="status-separator">|</span>
          <div className="status-item">
            <span>REACT MODE</span>
          </div>
          <span className="status-separator">|</span>
          <div className="status-item">
            <span>LVL: DEV</span>
          </div>
        </div>

        {/* Social Links */}
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

        {/* Footer Note */}
        <small className="footer-note">
          ◆ GAME OVER - THANKS FOR PLAYING ◆ {new Date().getFullYear()}
        </small>
      </div>
    </footer>
  );
};

export default Footer;

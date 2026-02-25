import React, { useState, useEffect } from "react";
import profileImg from "../assets/AboutImage/homeimg.jpeg";
import "../components/css/Home.css";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleResumeDownload = (e) => {
    // Prevent default anchor behavior
    e.preventDefault();
    
    // Create a hidden anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/resume/Gunasekar_Resume.pdf';
    link.download = 'Gunasekar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show alert after download starts
    setTimeout(() => {
      setShowAlert(true);
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }, 500);
  };

  return (
    <section id="home" className="section home">
      <div className="container">
        <div className="home-content">

          {/* TEXT CONTENT */}
          <div className="home-text">
            <div className="press-start">
              PRESS START<span className="blink">_</span>
            </div>

            <h1 className="welcome-player">
              Welcome, Player<span className="blink">▌</span>
            </h1>

            <h2 className="hero-title">
              <span className="name">GUNASEKAR</span>
            </h2>

            <h3 className="hero-subtitle">
              [ FULL-STACK DEVELOPER ]
            </h3>

            <div className="hero-desc">
              ◆ Quest: Building epic web applications with Python, Django, SQL,
              HTML, CSS, JavaScript & React. <br />
              ◆ Mission: Create clean, responsive & scalable digital realms.
            </div>

            <div className="hero-actions">
              <a
                href="#about" className="hire-btn primary"
              >
                <span>▶ START QUEST</span>
              </a>

              <div className="download-btn-wrapper">
                <a
                  href="/resume/Gunasekar_Resume.pdf"
                  className="hire-btn secondary"
                  onClick={handleResumeDownload}
                >
                  <span>⬇ GET MAP</span>
                </a>

                {/* Retro Success Alert */}
                {showAlert && (
                  <div className="retro-alert">
                    <span className="retro-alert-message">RESUME DOWNLOADED SUCCESSFULLY</span>
                  </div>
                )}
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://web.whatsapp.com/"
                aria-label="WhatsApp"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/gunasekar0223/"
                aria-label="LinkedIn"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a
                href="https://github.com/guna0223"
                aria-label="GitHub"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div className="home-image">
            <div className="pixel-frame">
              <img
                src={profileImg}
                alt="Gunasekar"
                className="profile-image"
              />
            </div>
            <div className="frame-decoration">
              ★ PLAYER 1 ★
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Home;

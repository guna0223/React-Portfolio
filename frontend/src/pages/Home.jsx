import React from "react";
import profileImg from "../assets/AboutImage/homeimg.jpeg"; 
import "../components/css/Home.css"; 

const Home = () => {
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
              HTML, CSS, JavaScript & React. 
              ◆ Mission: Create clean, responsive & scalable digital realms.
            </div>

            <div className="hero-actions">
              <button className="hire-btn primary">
                <span>▶ START QUEST</span>
              </button>

              <a 
                href="/src/assets/resume/Gunasekar D --Resume.pdf" 
                download
                className="hire-btn secondary"
              >
                <span>⬇ GET MAP</span>
              </a>
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

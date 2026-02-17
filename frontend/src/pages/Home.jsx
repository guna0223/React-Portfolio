import React from "react";
import profileImg from "../assets/AboutImage/img.jpg"; 
import "../components/css/Home.css"; 

const Home = () => {
  return (
    <section id="home" className="section home">
      <div className="container">
        <div className="home-content">
          
          {/* TEXT CONTENT */}
          <div className="home-text">
            <div className="mystical-intro animate-on-scroll">
              <span className="intro-rune">◈</span>
              <span className="greeting">Hello, I am</span>
              <span className="intro-rune">◈</span>
            </div>

            <h1 className="hero-title animate-on-scroll">
              <span className="accent-name">Gunasekar</span>
            </h1>

            <h2
              className="hero-subtitle animate-on-scroll"
              id="rotating-profession"
            >
              <span className="subtitle-prefix">Full-Stack</span> Developer
            </h2>

            <p className="hero-desc animate-on-scroll">
              A passionate Full-Stack Developer skilled in Python, Django, SQL,
              and modern frontend technologies including HTML, CSS, JavaScript,
              and React, focused on building clean, responsive, and scalable web
              applications.
            </p>

            <div className="hero-actions animate-on-scroll">
              <button className="hire-btn primary">
                <span className="btn-icon">⚡</span>
                <span>Hire Me</span>
              </button>

              <button className="hire-btn secondary">
                <i className="fas fa-download"></i>
                <span>Download resume</span>
              </button>
            </div>

            <div className="social-links animate-on-scroll">
              <a
                href="https://web.whatsapp.com/"
                aria-label="WhatsApp"
                className="social-icon mystic-whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
                <span className="social-glow"></span>
              </a>

              <a
                href="https://www.linkedin.com/in/gunasekar0223/"
                aria-label="LinkedIn"
                className="social-icon mystic-linkedin"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
                <span className="social-glow"></span>
              </a>

              <a
                href="https://github.com/guna0223"
                aria-label="GitHub"
                className="social-icon mystic-github"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github"></i>
                <span className="social-glow"></span>
              </a>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div className="home-image animate-on-scroll">
            <div className="portal-frame">
              <div className="portal-ring outer-ring">⍟</div>
              <div className="portal-ring outer-ring">⍟</div>
              <div className="portal-ring middle-ring">✺</div>
              <div className="portal-ring inner-ring">⊛</div>

              <div className="portal-core">
                <img
                  src={profileImg}
                  alt="Gunasekar"
                  className="profile-image"
                />
              </div>

              <div className="portal-particles"></div>
            </div>

            <div className="floating-runes">
              <span className="rune">⧉</span>
              <span className="rune">⍟</span>
              <span className="rune">✺</span>
              <span className="rune">⊛</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Home;

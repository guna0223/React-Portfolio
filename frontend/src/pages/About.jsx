import React, { useState } from "react";
import "../components/css/About.css";
import aboutImg from "../assets/AboutImage/img.jpeg";
import "bootstrap-icons/font/bootstrap-icons.css";


const About = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleResumeDownload = () => {
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
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">
          [ PLAYER PROFILE ]
        </h2>
        
        <div className="about-content">

          {/* IMAGE SECTION - Player Card */}
          <div className="about-image">
            <div className="profile-card">
              <div className="profile-header">
                ★ PLAYER 1 ★
              </div>
              <div className="avatar-frame">
                <img
                  src={aboutImg}
                  alt="About Gunasekar"
                  className="about-img"
                />
              </div>
              <div className="player-level">
                LVL: DEV
              </div>
            </div>
          </div>

          {/* TEXT SECTION */}
          <div className="about-text">
            <div className="bio-box">
              <p className="about-description">
                <span className="bio-line bio-decorative">═══════════════════════════════════</span>
                <span className="bio-line bio-greeting">Greetings, traveler! I am a Full-Stack Developer specializing in the ancient arts of Python, Django, SQL, and modern frontend grimoires including HTML, CSS, JavaScript, and React.</span>
                <span className="bio-line bio-decorative">═══════════════════════════════════</span>
                <span className="bio-line bio-quest">My quest: Building clean, responsive, and scalable web applications across the digital realm.</span>
              </p>
            </div>

            {/* Player Stats */}
            <div className="player-stats">
              <div className="stat-box">
                <div className="stat-label">◆ CLASS</div>
                <div className="stat-value">Full-Stack Dev</div>
              </div>
              
              <div className="stat-box">
                <div className="stat-label">◆ LOCATION</div>
                <div className="stat-value">BTM, Bengaluru</div>
              </div>
              
              <div className="stat-box">
                <div className="stat-label">◆ EDUCATION</div>
                <div className="stat-value">Computer Science</div>
              </div>
              
              <div className="stat-box">
                <div className="stat-label">◆ STATUS</div>
                <div className="stat-value" style={{color: 'var(--retro-green)'}}>● ACTIVE</div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="tech-stack">
              <div className="tech-label">◆ TECH STACK ◆</div>
              <div className="tech-items">
                <span className="tech-item">Python</span>
                <span className="tech-item">Django</span>
                <span className="tech-item">SQL</span>
                <span className="tech-item">HTML</span>
                <span className="tech-item">CSS</span>
                <span className="tech-item">JavaScript</span>
                <span className="tech-item">React</span>
              </div>
            </div>

            <div className="about-actions">
              <button className="about-btn" onClick={handleResumeDownload}>
                ⬇ DOWNLOAD MAP
              </button>
              
              {/* Retro Success Alert */}
              {showAlert && (
                <div className="retro-alert">
                  <div className="retro-alert-content">
                    <span className="retro-alert-icon">★</span>
                    <span className="retro-alert-message">RESUME DOWNLOADED SUCCESSFULLY</span>
                    <span className="retro-alert-icon">★</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

import React from "react";
import "../components/css/About.css"; 
// import aboutImg from "../assets/Aboutimage/img.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";


const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-content">
          
          {/* IMAGE SECTION */}
          <div className="about-image">
            <div className="grimoire-frame">
              <div className="book-spine"></div>
              <div className="book-cover">
                <img
                  src={aboutImg}
                  alt="About Gunasekar"
                  className="about-img"
                />
              </div>
              <div className="magical-seal"></div>
            </div>
          </div>

          {/* TEXT SECTION */}
          <div className="about-text">
            <h2 className="section-title">
              <span className="title-icon">📜</span>
              About Me
            </h2>

            <div className="about-description">
              <p className="intro-paragraph">
                <span className="drop-cap">W</span>elcome, seeker of arcane
                knowledge. I am a Web Developer who has transcended the ordinary
                and embraced the mystic arts of code.
              </p>

              <p>
                A passionate Sorcerer of Full-Stack Development, I currently
                master the ancient arts of Python, Django, SQL, and modern
                frontend grimoires including HTML, CSS, JavaScript, and React.
                My quest leads me through the multidimensional realms of clean,
                responsive, and scalable web applications.
              </p>
            </div>

            <div className="about-highlights">
              <div className="highlight">
                <div className="highlight-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h4>Education</h4>
                  <p>Computer Science</p>
                </div>
                <div className="highlight-glow"></div>
              </div>

              <div className="highlight">
                <div className="highlight-icon">
                  <i className="fas fa-location-dot"></i>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>
                    BTM 1<sup>st</sup> Stage, Bengaluru
                  </p>
                </div>
                <div className="highlight-glow"></div>
              </div>

              <div className="highlight">
                <div className="highlight-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div>
                  <h4>Specialization</h4>
                  <p>Web Development</p>
                </div>
                <div className="highlight-glow"></div>
              </div>
            </div>

            <div className="about-actions">
              <button className="about-btn">
                <i className="fas fa-download"></i>
                <span>Download CV</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

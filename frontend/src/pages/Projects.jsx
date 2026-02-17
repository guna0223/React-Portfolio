import React from "react";
import "../components/css/Projects.css"; 

const Projects = () => {
  return (
    <section id="project" className="section projects">
      <div className="container">
        <h2 className="section-title">
          <span className="title-icon">🗝️</span>
          My Projects
        </h2>

        <div className="projects-content">
          <div className="projects-grid">

            {/* WhatsApp Project */}
            <div className="project-card animate-on-scroll">
              <div className="project-image">
                <div className="relic-frame">
                  <img
                    src="assets/images/project-img/what's_app.png"
                    alt="WhatsApp UI Project"
                  />
                </div>

                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href="https://whatsapp-ui-ten.vercel.app/"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-arrow-up-right-from-square"></i>
                    </a>
                    <a
                      href="https://github.com/guna0223/whatsapp-ui"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3>WhatsApp UI Clone</h3>
                <p>
                  Built a responsive WhatsApp UI clone using React, featuring
                  chat lists, message layout, and dynamic data rendering using JSON.
                </p>

                <div className="project-tech">
                  <span className="tech-rune">⦿</span><span>React</span>
                  <span className="tech-rune">⦿</span><span>JavaScript</span>
                  <span className="tech-rune">⦿</span><span>JSON</span>
                  <span className="tech-rune">⦿</span><span>CSS</span>
                </div>
              </div>
            </div>

            {/* Weather Project */}
            <div className="project-card animate-on-scroll">
              <div className="project-image">
                <div className="relic-frame">
                  <img
                    src="/assets/images/project-img/weather.png"
                    alt="Weather Dashboard"
                  />
                </div>

                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href="https://weather-dashbord-seven.vercel.app/"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-arrow-up-right-from-square"></i>
                    </a>
                    <a
                      href="https://github.com/guna0223/weather-dashbord"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3>Weather Dashboard</h3>
                <p>
                  An interactive weather dashboard with location-based forecasts,
                  weather maps, and historical data visualization.
                </p>

                <div className="project-tech">
                  <span className="tech-rune">⦿</span><span>JavaScript</span>
                  <span className="tech-rune">⦿</span><span>OpenWeather API</span>
                </div>
              </div>
            </div>

            {/* Portfolio Project */}
            <div className="project-card animate-on-scroll">
              <div className="project-image">
                <div className="relic-frame">
                  <img
                    src="/assets/images/project-img/portfolio.png"
                    alt="Portfolio Website"
                  />
                </div>

                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href="https://portfolio-rho-ivory-hvtoexlqp1.vercel.app/"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-arrow-up-right-from-square"></i>
                    </a>
                    <a
                      href="https://github.com/guna0223/portfolio"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3>Portfolio Website</h3>
                <p>
                  A modern, responsive portfolio website showcasing creative
                  work with smooth animations and interactive elements.
                </p>

                <div className="project-tech">
                  <span className="tech-rune">⦿</span><span>HTML5</span>
                  <span className="tech-rune">⦿</span><span>CSS3</span>
                  <span className="tech-rune">⦿</span><span>JavaScript</span>
                </div>
              </div>
            </div>

            {/* Movie App */}
            <div className="project-card animate-on-scroll">
              <div className="project-image">
                <div className="relic-frame">
                  <img
                    src="/assets/images/project-img/movie.png"
                    alt="Movie App"
                  />
                </div>

                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href="https://movie-project-omega-tawny.vercel.app/"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-arrow-up-right-from-square"></i>
                    </a>
                    <a
                      href="https://github.com/guna0223/movie-project"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3>Movie App</h3>
                <p>
                  A powerful movie browsing app built with React and TMDB API,
                  featuring real-time search, detailed movie information, and
                  a favorites system with responsive UI.
                </p>

                <div className="project-tech">
                  <span className="tech-rune">⦿</span><span>React</span>
                  <span className="tech-rune">⦿</span><span>Context API</span>
                  <span className="tech-rune">⦿</span><span>TMDB API</span>
                  <span className="tech-rune">⦿</span><span>CSS</span>
                </div>
              </div>
            </div>

            {/* Game Selling App */}
            <div className="project-card animate-on-scroll">
              <div className="project-image">
                <div className="relic-frame">
                  <img
                    src="/assets/images/project-img/game.png"
                    alt="Game Selling App"
                  />
                </div>

                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href="https://github.com/guna0223/Django-Game"
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3>Game Selling App</h3>
                <p>
                  A full-stack game selling web application developed using
                  Django, featuring authentication, product management,
                  order handling, and an admin dashboard.
                </p>

                <div className="project-tech">
                  <span className="tech-rune">⦿</span><span>Django</span>
                  <span className="tech-rune">⦿</span><span>Python</span>
                  <span className="tech-rune">⦿</span><span>HTML</span>
                  <span className="tech-rune">⦿</span><span>CSS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

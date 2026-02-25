import React, { useState } from "react";
import "../components/css/Projects.css";
import gameSellingImg from "../assets/images/project-img/gameselling.png";
import whatsapp from "../assets/images/project-img/whatapp.png";
import portfolioImg from "../assets/images/project-img/portfolio.png";
import weatherImg from "../assets/images/project-img/weather.png";
import movie from "../assets/images/project-img/movie.png";
import shopping from "../assets/images/project-img/shopping.png";


const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "VEXO – E-Commerce App",
      image: shopping,
      description: "Modern & responsive e-commerce web app built using React. Integrates FakeStore API for dynamic product data, featuring listing, filtering, search, wishlist & cart.",
      tech: ["React", "REST API", "CSS3"],
      link: "https://react-ecommerce-fxed.vercel.app/",
      github: "https://github.com/guna0223/React-Ecommerce"
    },
    {
      id: 2,
      title: "WhatsApp UI Clone",
      image: whatsapp,
      description: "Responsive WhatsApp UI clone using React with chat lists, message layout & dynamic data rendering.",
      tech: ["React", "JavaScript", "JSON", "CSS"],
      link: "https://whatsapp-ui-ten.vercel.app/",
      github: "https://github.com/guna0223/whatsapp-ui"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      image: weatherImg,
      description: "Interactive weather dashboard with location-based forecasts, weather maps & historical data visualization.",
      tech: ["JavaScript", "OpenWeather API"],
      link: "https://weather-dashbord-seven.vercel.app/",
      github: "https://github.com/guna0223/weather-dashbord"
    },
    {
      id: 4,
      title: "Portfolio Website",
      image: portfolioImg,
      description: "Modern, responsive portfolio built with React, focused on performance, accessibility & clean UI.",
      tech: ["React", "JavaScript", "CSS3", "Vite"],
      link: "https://portfolio-guna.vercel.app/",
      github: "https://github.com/guna0223/portfolio"
    },
    {
      id: 5,
      title: "Movie App",
      image: movie,
      description: "Movie browsing app built with React & TMDB API, featuring real-time search, detailed info & favorites.",
      tech: ["React", "Context API", "TMDB API", "CSS"],
      link: "https://movie-project-omega-tawny.vercel.app/",
      github: "https://github.com/guna0223/movie-project"
    },
    {
      id: 6,
      title: "Game Selling App",
      image: gameSellingImg,
      description: "Full-stack game selling web app using Django with authentication, product & order management.",
      tech: ["Django", "Python", "HTML", "CSS"],
      link: null,
      github: "https://github.com/guna0223/Django-Game"
    }
  ];

  const toggleProject = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <section id="project" className="section projects">
      <div className="container">
        <h2 className="section-title">
          [ QUEST LOG ]
        </h2>

        <div className="projects-content">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <React.Fragment key={project.id}>
                <div 
                  className={`project-card ${activeProject === project.id ? 'active' : ''}`}
                  onClick={() => toggleProject(project.id)}
                >
                  <div className="project-selector">
                    {activeProject === project.id ? '▶' : '○'}
                  </div>
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="project-info">
                    <h3>◆ {project.title}</h3>
                    <p>Click to {activeProject === project.id ? 'close' : 'view'} details</p>
                    <div className="project-tech">
                      {project.tech.map((t, i) => (
                        <span key={i}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Details Dialog */}
                {activeProject === project.id && (
                  <div className="project-details open">
                    <div className="dialog-header">
                      <div className="dialog-title">◆ {project.title}</div>
                      <button 
                        className="dialog-close"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="dialog-content">
                      <div className="dialog-image">
                        <img src={project.image} alt={project.title} />
                      </div>
                      <div className="dialog-text">
                        <h4>◆ MISSION BRIEFING</h4>
                        <p>{project.description}</p>
                        <div className="project-meta">
                          {project.tech.map((t, i) => (
                            <span key={i}>{t}</span>
                          ))}
                        </div>
                        <div className="dialog-buttons">
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="dialog-btn primary"
                            >
                              ▶ LAUNCH
                            </a>
                          )}
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noreferrer"
                            className="dialog-btn secondary"
                          >
                            ⌂ SOURCE
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

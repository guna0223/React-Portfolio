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
      description: "A modern and fully responsive e-commerce web application built with React. Features include dynamic product listings with FakeStore API integration, advanced filtering by category and price, real-time search functionality, persistent wishlist and shopping cart features, and a seamless checkout experience. The app emphasizes performance optimization with lazy loading and efficient state management.",
      tech: ["React", "REST API", "CSS3", "Context API"],
      link: "https://react-ecommerce-fxed.vercel.app/",
      github: "https://github.com/guna0223/React-Ecommerce"
    },
    {
      id: 2,
      title: "WhatsApp UI Clone",
      image: whatsapp,
      description: "A pixel-perfect responsive WhatsApp UI clone built with React. Features include a complete chat list sidebar with search, message conversations with timestamps, online status indicators, typing indicators, and dynamic data rendering from JSON. The interface maintains full responsiveness across mobile, tablet, and desktop devices.",
      tech: ["React", "JavaScript", "JSON", "CSS3", "Responsive Design"],
      link: "https://whatsapp-ui-ten.vercel.app/",
      github: "https://github.com/guna0223/whatsapp-ui"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      image: weatherImg,
      description: "An interactive and user-friendly weather dashboard featuring location-based forecasts using geolocation API, current weather conditions with detailed metrics (temperature, humidity, wind speed), 7-day forecast predictions, interactive weather maps with visual overlays, and historical data visualization charts. Integrates OpenWeather API for real-time data.",
      tech: ["JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
      link: "https://weather-dashbord-seven.vercel.app/",
      github: "https://github.com/guna0223/weather-dashbord"
    },
    {
      id: 4,
      title: "Portfolio Website",
      image: portfolioImg,
      description: "A modern, responsive portfolio built with React focused on performance, accessibility, and clean UI. Features smooth scroll navigation, responsive design for all devices, SEO optimization, interactive animations, and a unique retro arcade-style loading screen. Includes sections for home, about, skills, services, projects, and contact with a cohesive dark theme design.",
      tech: ["React", "JavaScript", "CSS3", "Vite", "Responsive Design"],
      link: "https://portfolio-guna.vercel.app/",
      github: "https://github.com/guna0223/portfolio"
    },
    {
      id: 5,
      title: "Movie App",
      image: movie,
      description: "A feature-rich movie browsing application built with React and TMDB API. Offers real-time search functionality across thousands of movies, detailed movie information pages with cast, crew, trailers and reviews, favorite/wishlist management with local storage persistence, trending movies section, genre-based filtering, and a sleek dark-themed UI with smooth animations.",
      tech: ["React", "Context API", "TMDB API", "CSS3", "Local Storage"],
      link: "https://movie-project-omega-tawny.vercel.app/",
      github: "https://github.com/guna0223/movie-project"
    },
    {
      id: 6,
      title: "Game Selling App",
      image: gameSellingImg,
      description: "A full-stack game selling web application built with Django framework. Features include secure user authentication and authorization system, comprehensive product catalog management for games, shopping cart functionality, order processing and tracking, admin dashboard for inventory management, PostgreSQL database integration, and responsive design for all devices.",
      tech: ["Django", "Python", "HTML", "CSS3", "PostgreSQL", "Authentication"],
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

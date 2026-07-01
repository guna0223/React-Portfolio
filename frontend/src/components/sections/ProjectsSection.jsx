import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, X } from 'lucide-react';
import { projects, clientProjects } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import HoloCard from '../ui/HoloCard';
import './ProjectsSection.css';

/* ─── Alert System ─── */
const showAlert = (title, message, type = 'info') => {
  const alert = document.createElement('div');
  alert.className = 'ninja-alert';
  alert.innerHTML = `
    <div class="ninja-alert-content">
      <div class="ninja-alert-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : ''}</div>
      <div class="ninja-alert-text">
        <div class="ninja-alert-title">${title}</div>
        <div class="ninja-alert-message">${message}</div>
      </div>
    </div>
  `;
  document.body.appendChild(alert);
  setTimeout(() => alert.classList.add('show'), 10);
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 300);
  }, 3000);
};

const ProjectCard = ({ project, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div className="sharingan-card project-card-outer">
      <motion.div
        layout initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }}
        onClick={() => {
          showAlert('Mission Intel', `Accessing details for ${project.title}...`, 'info');
          onClick(project);
        }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="project-card"
      >
        <div className="project-image-container">
          <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
          <div className="project-image-overlay" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }} className="project-actions">
            {project.link && <a href={project.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="project-action-btn project-action-btn--live"><ExternalLink size={16} /></a>}
            <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="project-action-btn project-action-btn--github"><Code size={16} /></a>
          </motion.div>
        </div>
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="text-body project-description">{project.description}</p>
          <div className="project-tech-tags">
            {project.tech.map(t => <span key={t} className="project-tech-tag">{t}</span>)}
          </div>
        </div>
        {project.featured && <div className="project-featured-badge">Featured</div>}
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);
  const [projectType, setProjectType] = useState('personal');

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  const activeProjects = projectType === 'personal' ? projects : clientProjects;

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="grid-background" />
      <div className="section-container projects-section-container">
        <SectionHeading number="04" title={<>Featured <span className="text-gradient">Work</span></>} subtitle="Missions completed with precision and mastery" />
        
        <div className="project-type-switch">
          <button 
            className={`project-type-btn ${projectType === 'personal' ? 'active' : ''}`}
            onClick={() => setProjectType('personal')}
          >
            Personal Projects
          </button>
          <button 
            className={`project-type-btn ${projectType === 'client' ? 'active' : ''}`}
            onClick={() => setProjectType('client')}
          >
            Client Projects
          </button>
        </div>

        <div className="projects-grid">
          {activeProjects.map(p => <ProjectCard key={p.id} project={p} onClick={setSelected} />)}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="project-modal-backdrop"
          >
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', bounce: 0.2 }} onClick={e => e.stopPropagation()}
              className="project-modal"
            >
              <button onClick={() => {
                showAlert('Mission Closed', 'Returning to the archive...', 'info');
                setSelected(null);
              }} className="project-modal-close"><X size={18} /></button>

              <div className="project-modal-scroll">
                <div className="project-modal-image"><img src={selected.image} alt={selected.title} loading="lazy" /></div>
                <div className="project-modal-content">
                  <h2 className="text-h2 project-modal-title">{selected.title}</h2>
                  <p className="text-body project-modal-description">{selected.description}</p>
                  <div className="project-modal-tech">
                    {selected.tech.map(t => <span key={t} className="project-modal-tech-tag">{t}</span>)}
                  </div>
                  <div className="project-modal-buttons">
                    {selected.link && <a href={selected.link} target="_blank" rel="noreferrer" onClick={() => showAlert('Live Mission', `Deploying ${selected.title} live demo...`, 'info')}
                      className="project-modal-btn project-modal-btn--live"><ExternalLink size={16} />Live Demo</a>}
                    <a href={selected.github} target="_blank" rel="noreferrer" onClick={() => showAlert('Source Code', `Revealing the source code for ${selected.title}...`, 'info')}
                      className="project-modal-btn project-modal-btn--source"><Code size={16} />Source Code</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(ProjectsSection);

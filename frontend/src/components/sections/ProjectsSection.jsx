import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, X, Layers } from 'lucide-react';
import { projects, clientProjects } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import { useSound } from '../../context/SoundContext';
import './ProjectsSection.css';

const FILTER_CATEGORIES = [
  { key: 'all', label: 'All Missions' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'django', label: 'Python / Django' },
  { key: 'react', label: 'React Ecosystem' },
  { key: 'client', label: 'Client Work' },
];

const ProjectCard = ({ project, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const { playSfx } = useSound();

  return (
    <motion.div className="sharingan-card project-card-outer">
      <motion.div
        layout
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          playSfx('open');
          onClick(project);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="project-card"
      >
        <div className="project-image-container">
          <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
          <div className="project-image-overlay" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            className="project-actions"
          >
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playSfx('click');
                }}
                className="project-action-btn project-action-btn--live"
                title="Live Demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playSfx('click');
                }}
                className="project-action-btn project-action-btn--github"
                title="Source Code"
              >
                <Code size={16} />
              </a>
            )}
          </motion.div>
        </div>

        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="text-body project-description">{project.description}</p>
          <div className="project-tech-tags">
            {project.tech.map((t) => (
              <span key={t} className="project-tech-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.featured && <div className="project-featured-badge">Featured</div>}
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const { playSfx } = useSound();

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

  // Combined pool of all projects
  const allProjects = useMemo(() => {
    return [...clientProjects, ...projects];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return allProjects;
    if (activeFilter === 'client') return clientProjects;
    if (activeFilter === 'django') return projects.filter((p) => p.category === 'django');
    if (activeFilter === 'react') return projects.filter((p) => p.category === 'react' || p.category === 'frontend');
    if (activeFilter === 'fullstack') {
      return allProjects.filter((p) => p.category === 'django' || p.tech.includes('Node.js') || p.tech.includes('WebAssembly'));
    }
    return allProjects;
  }, [activeFilter, allProjects]);

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="grid-background" />
      <div className="section-container projects-section-container">
        <SectionHeading
          number="04"
          title={
            <>
              Featured <span className="text-gradient">Work</span>
            </>
          }
          subtitle="Production missions and client systems engineered with precision"
        />

        {/* Category Filter Pills */}
        <div className="project-filter-bar">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`project-filter-pill ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => {
                playSfx('click');
                setActiveFilter(cat.key);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playSfx('click');
              setSelected(null);
            }}
            className="project-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="project-modal"
            >
              <button
                onClick={() => {
                  playSfx('click');
                  setSelected(null);
                }}
                className="project-modal-close"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="project-modal-scroll">
                <div className="project-modal-image">
                  <img src={selected.image} alt={selected.title} loading="lazy" />
                </div>
                <div className="project-modal-content">
                  <h2 className="text-h2 project-modal-title">{selected.title}</h2>
                  <p className="text-body project-modal-description">{selected.description}</p>

                  {/* Architecture Details breakdown */}
                  {selected.architecture && (
                    <div className="project-modal-arch">
                      <div className="project-modal-arch-title">
                        <Layers size={14} style={{ display: 'inline', marginRight: '6px' }} />
                        System Architecture
                      </div>
                      <div className="project-modal-arch-grid">
                        {Object.entries(selected.architecture).map(([layer, desc]) => (
                          <div key={layer} className="project-modal-arch-item">
                            <strong>{layer}:</strong> {desc}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="project-modal-tech">
                    {selected.tech.map((t) => (
                      <span key={t} className="project-modal-tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-modal-buttons">
                    {selected.link && (
                      <a
                        href={selected.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playSfx('click')}
                        className="project-modal-btn project-modal-btn--live"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playSfx('click')}
                        className="project-modal-btn project-modal-btn--source"
                      >
                        <Code size={16} /> Source Code
                      </a>
                    )}
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

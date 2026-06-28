import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, X } from 'lucide-react';
import { projects } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import HoloCard from '../ui/HoloCard';

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
    <motion.div className="sharingan-card" style={{ borderRadius: '1.25rem' }}>
      <motion.div layout initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }}
        onClick={() => {
          showAlert('Mission Intel', `Accessing details for ${project.title}...`, 'info');
          onClick(project);
        }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', cursor: 'none', background: 'var(--color-bg-card)', border: `1px solid ${hovered ? 'rgba(204,34,34,0.45)' : 'var(--color-border-subtle)'}`, transition: 'all 0.4s', boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(204,34,34,0.2)' : '0 4px 20px rgba(0,0,0,0.2)', height: '100%' }}
      >
        <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: hovered ? 'linear-gradient(180deg, rgba(204,34,34,0.1) 0%, rgba(5,2,10,0.92) 100%)' : 'linear-gradient(180deg, transparent 40%, rgba(5,2,10,0.7) 100%)', transition: 'background 0.4s' }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }} style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 2 }}>
            {project.link && <a href={project.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '10px', background: 'rgba(204,34,34,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(204,34,34,0.3)', color: '#cc2222' }}><ExternalLink size={16} /></a>}
            <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '10px', background: 'rgba(123,47,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(123,47,255,0.3)', color: '#9f5fff' }}><Code size={16} /></a>
          </motion.div>
        </div>
        <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>{project.title}</h3>
          <p className="text-body" style={{ fontSize: '0.875rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '1rem' }}>
            {project.tech.map(t => <span key={t} style={{ padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'var(--font-mono)', background: 'rgba(204,34,34,0.08)', border: '1px solid rgba(204,34,34,0.2)', color: 'var(--color-accent-primary)' }}>{t}</span>)}
          </div>
        </div>
        {project.featured && <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: 700, fontFamily: 'var(--font-display)', background: 'rgba(204,34,34,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(204,34,34,0.4)', color: '#cc2222', letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 2 }}>Featured</div>}
        
        {/* Kunai Slash Overlay */}
        <div className={`kunai-slash-overlay ${hovered ? 'kunai-slash-active' : ''}`} />
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);

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

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="grid-background" />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading number="04" title={<>Featured <span className="text-gradient">Work</span></>} subtitle="Missions completed with precision and mastery" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }} className="projects-grid-new">
          {projects.map(p => <ProjectCard key={p.id} project={p} onClick={setSelected} />)}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'rgba(5,2,10,0.93)', backdropFilter: 'blur(12px)' }}
          >
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', bounce: 0.2 }} onClick={e => e.stopPropagation()}
              style={{ position: 'relative', width: '100%', maxWidth: 820, maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: '1.5rem', background: 'var(--color-bg-secondary)', border: '1px solid rgba(204,34,34,0.3)', boxShadow: '0 0 60px rgba(204,34,34,0.2), 0 0 120px rgba(123,47,255,0.1)', overflow: 'hidden' }}
            >
              <button onClick={() => {
                showAlert('Mission Closed', 'Returning to the archive...', 'info');
                setSelected(null);
              }} style={{ position: 'absolute', top: '1rem', right: '1rem', width: 36, height: 36, borderRadius: '50%', background: 'rgba(5,2,10,0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, cursor: 'pointer' }}><X size={18} /></button>
              
              <div style={{ overflowY: 'auto', flex: 1, minHeight: 0, width: '100%' }}>
                <div style={{ aspectRatio: '16/9', width: '100%' }}><img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div style={{ padding: '2rem' }}>
                  <h2 className="text-h2" style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>{selected.title}</h2>
                  <p className="text-body" style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>{selected.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    {selected.tech.map(t => <span key={t} style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 500, fontFamily: 'var(--font-mono)', background: 'rgba(204,34,34,0.1)', border: '1px solid rgba(204,34,34,0.25)', color: 'var(--color-accent-primary)' }}>{t}</span>)}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                     {selected.link && <a href={selected.link} target="_blank" rel="noreferrer" onClick={() => showAlert('Live Mission', `Deploying ${selected.title} live demo...`, 'info')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-purple))', color: '#fff', fontWeight: 600, fontSize: '0.9375rem', boxShadow: '0 0 20px rgba(204,34,34,0.4)', cursor: 'pointer' }}><ExternalLink size={16} />Live Demo</a>}
                     <a href={selected.github} target="_blank" rel="noreferrer" onClick={() => showAlert('Source Code', `Revealing the source code for ${selected.title}...`, 'info')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border-medium)', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.9375rem', cursor: 'pointer' }}><Code size={16} />Source Code</a>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:768px){.projects-grid-new{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
};

export default ProjectsSection;

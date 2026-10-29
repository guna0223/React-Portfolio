import React from 'react';
import { ExternalLink, Download, Mail, Terminal, Sparkles, MapPin } from 'lucide-react';
import { personalInfo, stats, skills, projects, clientProjects, experience } from '../../data/portfolio';
import profileImg from '../../assets/AboutImage/homeimg.jpeg';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import './MinimalistReader.css';

const GithubIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/**
 * MinimalistReader — High-Speed Recruiter Reader View
 * Clean, modern, distraction-free view designed for recruiters and quick skimming.
 */
const MinimalistReader = ({ onSwitchToTerminal }) => {
  const { showToast } = useToast();
  const { playSfx } = useSound();
  const allProjects = [...projects, ...clientProjects];

  const handleCopyEmail = () => {
    playSfx('click');
    navigator.clipboard.writeText(personalInfo.email);
    showToast('Email copied to clipboard!', 'success');
  };

  return (
    <div className="reader-view-container">
      <div className="reader-max-width">
        {/* Recruiter Header Bar */}
        <div className="reader-header-card">
          <div className="reader-profile-row">
            <img src={profileImg} alt={personalInfo.name} className="reader-avatar" />
            <div className="reader-profile-info">
              <div className="reader-badge-row">
                <span className="reader-status-pill">Available for Full-Time Roles</span>
                <span className="reader-location-pill">
                  <MapPin size={12} />
                  {personalInfo.location}
                </span>
              </div>
              <h1 className="reader-name">{personalInfo.name} {personalInfo.lastName}</h1>
              <p className="reader-title">{personalInfo.title}</p>
            </div>
          </div>

          <p className="reader-bio">{personalInfo.bio}</p>

          <div className="reader-header-actions">
            <a
              href={personalInfo.resumeUrl}
              download="Gunasekar_Resume.pdf"
              className="reader-btn primary"
              onClick={() => playSfx('click')}
            >
              <Download size={14} />
              Download Resume (PDF)
            </a>
            <button className="reader-btn secondary" onClick={handleCopyEmail}>
              <Mail size={14} />
              Copy Email
            </button>
            <button
              className="reader-btn terminal-toggle"
              onClick={() => {
                playSfx('click');
                onSwitchToTerminal();
              }}
            >
              <Terminal size={14} />
              Return to Terminal OS
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="reader-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="reader-stat-card">
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <section className="reader-section">
          <div className="reader-section-header">
            <Sparkles size={18} className="reader-section-icon" />
            <h2>Featured Projects & Client Missions</h2>
          </div>
          <div className="reader-projects-grid">
            {allProjects.map((p) => (
              <div key={p.id} className="reader-project-card">
                {p.image && (
                  <div className="reader-card-img-wrap">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                )}
                <div className="reader-card-content">
                  <div className="reader-card-top">
                    <h3>{p.title}</h3>
                    <span className="reader-card-cat">{p.category}</span>
                  </div>
                  <p>{p.description}</p>
                  <div className="reader-tech-pills">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="reader-card-links">
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="reader-link-btn primary">
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="reader-link-btn secondary">
                        <GithubIcon size={13} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="reader-section">
          <div className="reader-section-header">
            <Sparkles size={18} className="reader-section-icon" />
            <h2>Technical Skills & Proficiencies</h2>
          </div>
          <div className="reader-skills-grid">
            {Object.entries(skills).map(([cat, list]) => (
              <div key={cat} className="reader-skill-box">
                <h3 className="reader-skill-cat">{cat.toUpperCase()}</h3>
                <div className="reader-skill-tags">
                  {list.map((s) => (
                    <span key={s.name} className="reader-skill-tag">
                      {s.name} <small>{s.proficiency}%</small>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="reader-section">
          <div className="reader-section-header">
            <Sparkles size={18} className="reader-section-icon" />
            <h2>Work Experience & Milestones</h2>
          </div>
          <div className="reader-timeline">
            {experience.map((e) => (
              <div key={e.id} className="reader-timeline-card">
                <div className="reader-timeline-period">{e.period}</div>
                <h3>{e.title}</h3>
                <div className="reader-timeline-org">{e.organization}</div>
                <p>{e.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <div className="reader-footer-card">
          <h2>Ready to Build Together?</h2>
          <p>
            Whether you have an open engineering role, a startup project, or want to discuss full-stack architectures, my inbox is open.
          </p>
          <div className="reader-footer-btns">
            <a href={personalInfo.social.email} className="reader-btn primary">
              <Mail size={14} />
              Send Email ({personalInfo.email})
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="reader-btn secondary">
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalistReader;

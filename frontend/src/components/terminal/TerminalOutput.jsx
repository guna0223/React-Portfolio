import React from 'react';
import { ExternalLink, Copy, Check, Download, Send, Sparkles, Terminal as TerminalIcon } from 'lucide-react';
import { personalInfo, skills, projects, clientProjects, experience } from '../../data/portfolio';
import profileImg from '../../assets/AboutImage/homeimg.jpeg';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

const GithubIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   1. NEOFETCH / WHOAMI OUTPUT
───────────────────────────────────────────────────────────── */
export const NeofetchOutput = ({ onExecuteCmd }) => {
  return (
    <div className="terminal-output-card neofetch-card">
      <div className="neofetch-grid">
        <div className="neofetch-avatar-col">
          <div className="neofetch-avatar-wrapper">
            <img src={profileImg} alt={personalInfo.name} className="neofetch-avatar-img" />
            <div className="neofetch-avatar-badge">ONLINE</div>
          </div>
          <div className="neofetch-color-blocks">
            <span style={{ background: '#cc2222' }} />
            <span style={{ background: '#e34c26' }} />
            <span style={{ background: '#f0db4f' }} />
            <span style={{ background: '#00d4ff' }} />
            <span style={{ background: '#7b2fff' }} />
            <span style={{ background: '#ffffff' }} />
          </div>
        </div>

        <div className="neofetch-info-col">
          <div className="neofetch-header">
            <span className="neofetch-user">shinobi</span>
            <span className="neofetch-at">@</span>
            <span className="neofetch-host">gunasekar</span>
          </div>
          <div className="neofetch-divider">────────────────────────────</div>

          <div className="neofetch-specs">
            <div className="spec-row">
              <span className="spec-label">OS:</span>
              <span className="spec-val">Shinobi Linux x86_64 (v2.4)</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Host:</span>
              <span className="spec-val">Gunasekar Workstation / Bengaluru</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Kernel:</span>
              <span className="spec-val">6.1.0-shinobi-zen</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Uptime:</span>
              <span className="spec-val">3+ Years Building Scalable Web Apps</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Shell:</span>
              <span className="spec-val">bash 5.2.15 (Terminal OS)</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Editor:</span>
              <span className="spec-val">VS Code / Cursor / Neovim</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Core Jutsu:</span>
              <span className="spec-val">Python, Django, React, REST APIs</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Status:</span>
              <span className="spec-val highlight-green">● Available for Full-Time Roles</span>
            </div>
          </div>

          <p className="neofetch-bio">{personalInfo.bio}</p>

          <div className="neofetch-quick-actions">
            <button className="term-inline-btn" onClick={() => onExecuteCmd('projects')}>
              View Projects
            </button>
            <button className="term-inline-btn" onClick={() => onExecuteCmd('skills')}>
              View Skills
            </button>
            <button className="term-inline-btn highlight" onClick={() => onExecuteCmd('sudo hire')}>
              Sudo Hire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   2. PROJECTS OUTPUT (RICH CARDS)
───────────────────────────────────────────────────────────── */
export const ProjectsOutput = () => {
  const { playSfx } = useSound();
  const allProjects = [...projects, ...clientProjects];

  return (
    <div className="terminal-output-card">
      <div className="term-card-title">
        <TerminalIcon size={16} />
        <span>DEPLOYED MISSIONS & PROJECTS ({allProjects.length} Total)</span>
      </div>
      <div className="term-projects-grid">
        {allProjects.map((p) => (
          <div key={p.id} className="term-project-item">
            {p.image && (
              <div className="term-project-img-wrap">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="term-project-badge">{p.category?.toUpperCase() || 'PROJECT'}</span>
              </div>
            )}
            <div className="term-project-body">
              <h4 className="term-project-heading">{p.title}</h4>
              <p className="term-project-desc">{p.description}</p>

              {p.architecture && (
                <div className="term-arch-box">
                  <span className="arch-label">Architecture:</span>
                  <span className="arch-detail">
                    {p.architecture.frontend || p.architecture.backend || 'Full Stack'}
                  </span>
                </div>
              )}

              <div className="term-tech-tags">
                {p.tech.map((t) => (
                  <span key={t} className="term-tech-pill">
                    {t}
                  </span>
                ))}
              </div>

              <div className="term-project-actions">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="term-action-btn primary"
                    onClick={() => playSfx('click')}
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="term-action-btn secondary"
                    onClick={() => playSfx('click')}
                  >
                    <GithubIcon size={13} />
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   3. SKILLS OUTPUT (VISUAL CLI BARS)
───────────────────────────────────────────────────────────── */
export const SkillsOutput = () => {
  const renderProgressBar = (percent) => {
    const totalChars = 16;
    const filledChars = Math.round((percent / 100) * totalChars);
    const emptyChars = totalChars - filledChars;
    return `[${'█'.repeat(filledChars)}${'░'.repeat(emptyChars)}] ${percent}%`;
  };

  return (
    <div className="terminal-output-card">
      <div className="term-card-title">
        <Sparkles size={16} />
        <span>MASTERED JUTSU & TECHNICAL MATRIX</span>
      </div>

      <div className="term-skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="term-skill-category">
            <div className="term-cat-header">
              <span className="term-cat-prefix">#</span>
              <span className="term-cat-name">{category.toUpperCase()}</span>
            </div>
            <div className="term-skill-list">
              {items.map((item) => (
                <div key={item.name} className="term-skill-row">
                  <span className="skill-name">{item.name}</span>
                  <span className="skill-bar" style={{ color: item.color || 'var(--color-accent-primary)' }}>
                    {renderProgressBar(item.proficiency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   4. EXPERIENCE OUTPUT (GIT COMMIT GRAPH)
───────────────────────────────────────────────────────────── */
export const ExperienceOutput = () => {
  return (
    <div className="terminal-output-card">
      <div className="term-card-title">
        <TerminalIcon size={16} />
        <span>CAREER TIMELINE & COMMIT HISTORY (git log --graph)</span>
      </div>

      <div className="term-timeline">
        {experience.map((exp, idx) => (
          <div key={exp.id || idx} className="term-commit-item">
            <div className="term-commit-graph">
              <span className="commit-dot" />
              {idx < experience.length - 1 && <span className="commit-line" />}
            </div>
            <div className="term-commit-content">
              <div className="commit-header">
                <span className="commit-hash">commit #{exp.id || idx + 1}</span>
                <span className="commit-period">{exp.period}</span>
              </div>
              <h4 className="commit-title">{exp.title}</h4>
              <div className="commit-org">{exp.organization}</div>
              <p className="commit-desc">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   5. CONTACT OUTPUT
───────────────────────────────────────────────────────────── */
export const ContactOutput = () => {
  const [copied, setCopied] = React.useState(false);
  const { showToast } = useToast();
  const { playSfx } = useSound();

  const handleCopy = () => {
    playSfx('click');
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    showToast('Email copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="terminal-output-card contact-card">
      <div className="term-card-title">
        <Send size={16} />
        <span>DIRECT COMMUNICATION FREQUENCIES (contact.sh)</span>
      </div>

      <p className="term-contact-intro">
        Available for full-stack developer roles, freelance architectures, and high-impact software missions.
      </p>

      <div className="term-contact-methods">
        <div className="term-contact-row">
          <span className="method-label">Email:</span>
          <span className="method-val">{personalInfo.email}</span>
          <button className="term-copy-btn" onClick={handleCopy}>
            {copied ? <Check size={13} color="#00ff66" /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <a
            href={personalInfo.social.email}
            className="term-link-btn"
            onClick={() => playSfx('click')}
          >
            Launch Mail
          </a>
        </div>

        <div className="term-contact-row">
          <span className="method-label">LinkedIn:</span>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="method-link"
          >
            {personalInfo.social.linkedin}
          </a>
        </div>

        <div className="term-contact-row">
          <span className="method-label">GitHub:</span>
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noreferrer"
            className="method-link"
          >
            {personalInfo.social.github}
          </a>
        </div>

        <div className="term-contact-row">
          <span className="method-label">Location:</span>
          <span className="method-val">{personalInfo.location}</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   6. SUDO HIRE EASTER EGG OUTPUT
───────────────────────────────────────────────────────────── */
export const SudoHireOutput = () => {
  const { playSfx } = useSound();

  return (
    <div className="terminal-output-card sudo-hire-card">
      <div className="term-card-title highlight-red">
        <Sparkles size={16} />
        <span>PROTOCOL AUTHORIZED: S-RANK RECRUITMENT DOSSIER</span>
      </div>

      <div className="sudo-hire-box">
        <p className="sudo-hire-msg">
          Root privileges granted. You are accessing the priority hiring protocol for{' '}
          <strong>Gunasekar D</strong>.
        </p>

        <div className="sudo-specs-list">
          <div>✔ <strong>Available for:</strong> Full-Time Software Engineer / Full Stack Developer</div>
          <div>✔ <strong>Locations:</strong> Bengaluru, IN / Hybrid / Remote Worldwide</div>
          <div>✔ <strong>Notice Period:</strong> Immediate / Ready to deploy</div>
          <div>✔ <strong>Core Competencies:</strong> Python, Django, React, Node.js, SQL, REST Architecture</div>
        </div>

        <div className="sudo-actions">
          <a
            href={personalInfo.resumeUrl}
            download="Gunasekar_Resume.pdf"
            className="term-action-btn primary large"
            onClick={() => playSfx('click')}
          >
            <Download size={15} />
            Download Official Resume (PDF)
          </a>
          <a
            href={personalInfo.social.email}
            className="term-action-btn secondary large"
            onClick={() => playSfx('click')}
          >
            <Send size={15} />
            Initiate Interview Conversation
          </a>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   7. HELP OUTPUT (CLICKABLE MISSION SCROLL)
───────────────────────────────────────────────────────────── */
export const HelpOutput = ({ onExecuteCmd }) => {
  const commands = [
    { cmd: 'whoami', desc: 'Developer bio, background & workstation specs' },
    { cmd: 'projects', desc: 'Browse all deployed missions, live demos & source code' },
    { cmd: 'skills', desc: 'Technical mastery matrix with CLI proficiency bars' },
    { cmd: 'experience', desc: 'Git commit graph of internships & milestones' },
    { cmd: 'contact', desc: 'Direct communication channels & 1-click email copy' },
    { cmd: 'resume', desc: 'Download official software engineering resume' },
    { cmd: 'sudo hire', desc: 'S-Rank Recruiter VIP protocol & expedited hiring' },
    { cmd: 'theme', desc: 'Cycle themes (Shinobi Crimson ⚡ Executive Cyan)' },
    { cmd: 'video', desc: 'Toggle background Madara cinematic video on / off' },
    { cmd: 'sound', desc: 'Toggle synthesized mechanical keyboard audio' },
    { cmd: 'gui', desc: 'Switch to minimalist Recruiter Reader view' },
    { cmd: 'clear', desc: 'Wipe terminal output buffer' },
  ];

  return (
    <div className="terminal-output-card help-card">
      <div className="term-card-title">
        <TerminalIcon size={16} />
        <span>AVAILABLE SHINOBI COMMANDS (Click any to run)</span>
      </div>

      <div className="term-commands-grid">
        {commands.map(({ cmd, desc }) => (
          <button
            key={cmd}
            className="term-cmd-row"
            onClick={() => onExecuteCmd(cmd)}
            title={`Run "${cmd}"`}
          >
            <span className="term-cmd-badge">{cmd}</span>
            <span className="term-cmd-desc">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

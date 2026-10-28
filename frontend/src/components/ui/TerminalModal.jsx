import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { personalInfo, skills, projects, experience } from '../../data/portfolio';
import { useThemeMode } from '../../context/ThemeModeContext';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';

const HELP_TEXT = `
Available Jutsu Commands:
  help             - Display this mission scroll
  whoami / bio     - Developer background & shinobi dossier
  skills           - Technical jutsu & masteries
  projects         - List recent high-priority missions
  experience       - Journey, internships & achievements
  contact          - Direct communication frequencies
  theme            - Toggle between Shinobi & Executive mode
  sound            - Toggle background ambient soundtrack
  clear            - Wipe the terminal buffer
  sudo hire        - Initiate recruiter recruitment protocol
  exit             - Close the terminal
`;

const TerminalModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Konoha Shinobi Terminal v2.4 initialized.' },
    { type: 'system', text: 'Type "help" to view available developer jutsu commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const { toggleThemeMode, themeMode } = useThemeMode();
  const { toggleMute, isMuted, playSfx } = useSound();
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      playSfx('open');
    }
  }, [isOpen, playSfx]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Global key listener for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true); // Toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const newHistory = [...history, { type: 'user', text: `shinobi@gunasekar:~$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    playSfx('click');

    switch (lower) {
      case 'help':
        newHistory.push({ type: 'output', text: HELP_TEXT });
        break;
      case 'whoami':
      case 'bio':
        newHistory.push({
          type: 'output',
          text: `\n[DOSSIER] ${personalInfo.name} ${personalInfo.lastName}\nRole: ${personalInfo.title}\nLocation: ${personalInfo.location}\nBio: ${personalInfo.bio}\n`,
        });
        break;
      case 'skills':
        const skillList = Object.entries(skills)
          .map(([category, items]) => `• ${category.toUpperCase()}: ${items.map((i) => i.name).join(', ')}`)
          .join('\n');
        newHistory.push({ type: 'output', text: `\n[MASTERED JUTSU]\n${skillList}\n` });
        break;
      case 'projects':
        const projectList = projects
          .map((p) => `• [${p.id}] ${p.title} -> ${p.link || p.github} (${p.tech.join(', ')})`)
          .join('\n');
        newHistory.push({ type: 'output', text: `\n[DEPLOYED MISSIONS]\n${projectList}\n` });
        break;
      case 'experience':
        const expList = experience
          .map((e) => `• [${e.period}] ${e.title} @ ${e.organization} - ${e.description}`)
          .join('\n');
        newHistory.push({ type: 'output', text: `\n[MISSION HISTORY]\n${expList}\n` });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `\n[COMMUNICATION FREQUENCIES]\nEmail: ${personalInfo.email}\nLinkedIn: ${personalInfo.social.linkedin}\nGitHub: ${personalInfo.social.github}\n`,
        });
        break;
      case 'theme':
        toggleThemeMode();
        showToast('Theme Shift', `Theme set to: ${themeMode === 'shinobi' ? 'Executive' : 'Shinobi'}`, 'success');
        newHistory.push({ type: 'output', text: `Theme switched. Current active mode: ${themeMode === 'shinobi' ? 'executive' : 'shinobi'}` });
        break;
      case 'sound':
        toggleMute();
        newHistory.push({ type: 'output', text: `Soundtrack toggled. Muted: ${!isMuted}` });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo hire':
        playSfx('jutsu');
        showToast('Mission Accepted!', 'Direct communication line initiated. Opening email client...', 'success');
        newHistory.push({
          type: 'success',
          text: `\n[SUDO AUTHORIZED] CONTRACT OFFER PROTOCOL ENGAGED!\nGunasekar D is ready for deployment. Opening priority mail link...\n`,
        });
        setTimeout(() => {
          window.location.href = `mailto:${personalInfo.email}?subject=Job%20Opportunity%20for%20Gunasekar%20D`;
        }, 1200);
        break;
      case 'exit':
      case 'quit':
        onClose();
        break;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" for valid scrolls.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx);
          setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="terminal-modal-backdrop"
        >
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`terminal-modal-window ${isMaximized ? 'terminal-maximized' : ''}`}
          >
            {/* Window Title Bar */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot terminal-dot--red" onClick={onClose} title="Close" />
                <span className="terminal-dot terminal-dot--yellow" onClick={() => setHistory([])} title="Clear" />
                <span
                  className="terminal-dot terminal-dot--green"
                  onClick={() => setIsMaximized((prev) => !prev)}
                  title="Maximize"
                />
              </div>
              <div className="terminal-title">
                <TerminalIcon size={14} className="terminal-title-icon" />
                <span>shinobi-terminal ~ bash (Ctrl + K)</span>
              </div>
              <div className="terminal-actions">
                <button
                  onClick={() => setIsMaximized((p) => !p)}
                  className="terminal-action-btn"
                  aria-label="Maximize terminal"
                >
                  {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button onClick={onClose} className="terminal-action-btn" aria-label="Close terminal">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              className="terminal-body"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, idx) => (
                <div key={idx} className={`terminal-line terminal-line--${item.type}`}>
                  {item.text}
                </div>
              ))}

              {/* Active Prompt Line */}
              <div className="terminal-prompt-line">
                <span className="terminal-prompt-user">shinobi@gunasekar</span>
                <span className="terminal-prompt-colon">:</span>
                <span className="terminal-prompt-path">~</span>
                <span className="terminal-prompt-symbol">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="terminal-input"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(TerminalModal);

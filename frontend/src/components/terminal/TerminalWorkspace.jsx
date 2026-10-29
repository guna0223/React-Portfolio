import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, RotateCcw, Sparkles } from 'lucide-react';
import {
  NeofetchOutput,
  ProjectsOutput,
  SkillsOutput,
  ExperienceOutput,
  ContactOutput,
  SudoHireOutput,
  HelpOutput,
} from './TerminalOutput';
import QuickDock from './QuickDock';
import { personalInfo } from '../../data/portfolio';
import { useThemeMode } from '../../context/ThemeModeContext';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import './TerminalWorkspace.css';

const COMMANDS = [
  'help',
  'whoami',
  'bio',
  'neofetch',
  'skills',
  'projects',
  'experience',
  'contact',
  'resume',
  'theme',
  'video',
  'sound',
  'sudo hire',
  'gui',
  'reader',
  'clear',
  'cls',
  'ls',
  'dir',
  'cat',
  'pwd',
  'date',
];

const INITIAL_HISTORY = [
  { type: 'system', text: 'Konoha Shinobi Terminal v2.4 initialized.' },
  { type: 'system', text: 'Type "help" to view available developer jutsu commands, or tap the quick action dock below.' },
  { type: 'component', component: 'neofetch' },
];

const TerminalWorkspace = ({ onToggleView, onToggleVideo, isVideoEnabled }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef(null);
  const bufferRef = useRef(null);
  const { toggleThemeMode, themeMode } = useThemeMode();
  const { toggleMute, isMuted, playSfx } = useSound();
  const { showToast } = useToast();

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll buffer to bottom on history change
  useEffect(() => {
    if (bufferRef.current) {
      bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
    }
  }, [history]);

  // Execute a command string
  const executeCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const userEntry = {
      type: 'user',
      text: `shinobi@gunasekar : ~ $ ${trimmed}`,
    };

    const lower = trimmed.toLowerCase();
    playSfx('click');

    // Basic routing
    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    }

    if (lower === 'reset') {
      setHistory(INITIAL_HISTORY);
      showToast('Terminal session reset', 'info');
      return;
    }

    if (lower === 'gui' || lower === 'reader') {
      onToggleView();
      return;
    }

    if (lower === 'theme') {
      toggleThemeMode();
      setHistory((prev) => [
        ...prev,
        userEntry,
        {
          type: 'system',
          text: `Theme toggled. Active mode: ${themeMode === 'shinobi' ? 'Executive (Clean Slate)' : 'Shinobi (Anime Dark)'}`,
        },
      ]);
      return;
    }

    if (lower === 'video') {
      onToggleVideo();
      setHistory((prev) => [
        ...prev,
        userEntry,
        {
          type: 'system',
          text: `Background video: ${isVideoEnabled ? 'Disabled (Static Mode)' : 'Enabled (Cinematic Mode)'}`,
        },
      ]);
      return;
    }

    if (lower === 'sound') {
      toggleMute();
      setHistory((prev) => [
        ...prev,
        userEntry,
        {
          type: 'system',
          text: `Sound effects: ${isMuted ? 'Enabled' : 'Muted'}`,
        },
      ]);
      return;
    }

    if (lower === 'resume' || lower === 'download') {
      const link = document.createElement('a');
      link.href = personalInfo.resumeUrl;
      link.download = 'Gunasekar_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setHistory((prev) => [
        ...prev,
        userEntry,
        { type: 'system', text: 'Initiating download for Gunasekar_Resume.pdf...' },
      ]);
      showToast('Downloading resume...', 'success');
      return;
    }

    if (lower === 'pwd') {
      setHistory((prev) => [
        ...prev,
        userEntry,
        { type: 'output', text: '/home/shinobi/gunasekar-portfolio' },
      ]);
      return;
    }

    if (lower === 'date') {
      setHistory((prev) => [
        ...prev,
        userEntry,
        { type: 'output', text: new Date().toString() },
      ]);
      return;
    }

    if (lower === 'ls' || lower === 'dir') {
      setHistory((prev) => [
        ...prev,
        userEntry,
        {
          type: 'output',
          text: 'about.md    skills.json    projects/    experience/    contact.sh    Gunasekar_Resume.pdf',
        },
      ]);
      return;
    }

    if (lower.startsWith('cat ')) {
      const file = lower.replace('cat ', '').trim();
      let comp = null;
      if (file === 'about.md' || file === 'about') comp = 'neofetch';
      else if (file === 'skills.json' || file === 'skills') comp = 'skills';
      else if (file === 'contact.sh' || file === 'contact') comp = 'contact';
      else if (file === 'projects' || file === 'projects/') comp = 'projects';
      else if (file === 'experience' || file === 'experience/') comp = 'experience';

      if (comp) {
        setHistory((prev) => [...prev, userEntry, { type: 'component', component: comp }]);
      } else {
        setHistory((prev) => [
          ...prev,
          userEntry,
          { type: 'error', text: `cat: ${file}: No such file or directory` },
        ]);
      }
      return;
    }

    // Component-driven commands
    let componentType = null;
    if (lower === 'help' || lower === '?' || lower === 'menu') componentType = 'help';
    else if (lower === 'whoami' || lower === 'bio' || lower === 'neofetch') componentType = 'neofetch';
    else if (lower === 'skills') componentType = 'skills';
    else if (lower === 'projects') componentType = 'projects';
    else if (lower === 'experience' || lower === 'history' || lower === 'timeline') componentType = 'experience';
    else if (lower === 'contact' || lower === 'email') componentType = 'contact';
    else if (lower === 'sudo hire' || lower === 'hire' || lower === 'recruit') componentType = 'sudo hire';

    if (componentType) {
      setHistory((prev) => [
        ...prev,
        userEntry,
        { type: 'component', component: componentType },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        userEntry,
        {
          type: 'error',
          text: `Command not found: "${trimmed}". Type "help" to view the jutsu list.`,
        },
      ]);
    }
  };

  // Shortcut listener for Ctrl+L to clear screen
  useEffect(() => {
    const handleWorkspaceShortcuts = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setHistory([]);
      }
    };
    window.addEventListener('keydown', handleWorkspaceShortcuts);
    return () => window.removeEventListener('keydown', handleWorkspaceShortcuts);
  }, []);

  const handleKeyDown = (e) => {
    // Ctrl+K to toggle view
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      e.stopPropagation();
      onToggleView();
      return;
    }
    // Ctrl+L to clear screen
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      e.stopPropagation();
      setHistory([]);
      return;
    }
    // Ctrl+C to cancel current line
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      setInput('');
      return;
    }

    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Autocomplete command
      const match = COMMANDS.find((c) => c.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div className={`terminal-desktop-container ${isMaximized ? 'is-maximized' : ''}`}>
      <div className="terminal-window-frame" onClick={() => inputRef.current?.focus()}>
        {/* Terminal Title Bar */}
        <div className="terminal-window-header">
          {/* Traffic Light Buttons */}
          <div className="traffic-lights">
            <button
              type="button"
              className="traffic-dot dot-red"
              title="Reset terminal session"
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('reset');
              }}
            />
            <button
              type="button"
              className="traffic-dot dot-yellow"
              title="Switch to Reader View (Ctrl + K)"
              onClick={(e) => {
                e.stopPropagation();
                onToggleView();
              }}
            />
            <button
              type="button"
              className="traffic-dot dot-green"
              title="Toggle Fullscreen"
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
            />
          </div>

          {/* Terminal Title */}
          <div
            className="terminal-window-title"
            onClick={(e) => {
              e.stopPropagation();
              onToggleView();
            }}
            title="Switch to Reader View (Ctrl + K)"
            role="button"
            tabIndex={0}
          >
            <span className="title-prompt">&gt;_</span>
            <span className="title-text">
              <span className="title-full">shinobi-terminal ~ bash (Ctrl + K)</span>
              <span className="title-short">shinobi-term (Ctrl+K)</span>
            </span>
          </div>

          {/* Header Controls */}
          <div className="terminal-window-controls">
            <button
              type="button"
              className="term-header-btn"
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('reset');
              }}
              title="Reset buffer"
            >
              <RotateCcw size={13} />
            </button>
            <button
              type="button"
              className="term-header-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
              title={isMaximized ? 'Restore window' : 'Maximize window'}
            >
              {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
          </div>
        </div>

        {/* Terminal Buffer Scroll Area */}
        <div className="terminal-window-body" ref={bufferRef}>
          {history.map((item, idx) => {
            if (item.type === 'system') {
              return (
                <div key={idx} className="term-line term-system">
                  {item.text}
                </div>
              );
            }
            if (item.type === 'user') {
              return (
                <div key={idx} className="term-line term-user">
                  <span className="term-prompt-user">shinobi@gunasekar</span>
                  <span className="term-prompt-colon"> : </span>
                  <span className="term-prompt-tilde">~</span>
                  <span className="term-prompt-dollar"> sudo  $ :  </span>
                  <span className="term-cmd-text">{item.text.replace('shinobi@gunasekar : ~ $ ', '')}</span>
                </div>
              );
            }
            if (item.type === 'error') {
              return (
                <div key={idx} className="term-line term-error">
                  {item.text}
                </div>
              );
            }
            if (item.type === 'output') {
              return (
                <pre key={idx} className="term-line term-pre">
                  {item.text}
                </pre>
              );
            }
            if (item.type === 'component') {
              return (
                <div key={idx} className="term-line term-component-wrapper">
                  {item.component === 'neofetch' && (
                    <NeofetchOutput onExecuteCmd={executeCommand} />
                  )}
                  {item.component === 'projects' && <ProjectsOutput />}
                  {item.component === 'skills' && <SkillsOutput />}
                  {item.component === 'experience' && <ExperienceOutput />}
                  {item.component === 'contact' && <ContactOutput />}
                  {item.component === 'sudo hire' && <SudoHireOutput />}
                  {item.component === 'help' && (
                    <HelpOutput onExecuteCmd={executeCommand} />
                  )}
                </div>
              );
            }
            return null;
          })}

          {/* Active Input Line */}
          <div className="terminal-active-input-line">
            <span className="term-prompt-user">shinobi@gunasekar</span>
            <span className="term-prompt-colon"> : </span>
            <span className="term-prompt-tilde">~</span>
            <span className="term-prompt-dollar">sudo $ :  </span>
            <input
              ref={inputRef}
              type="text"
              className="term-cli-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal command line input"
            />
          </div>
        </div>

        {/* Bottom Quick Action Dock */}
        <QuickDock onExecuteCmd={executeCommand} onToggleView={onToggleView} />
      </div>
    </div>
  );
};

export default TerminalWorkspace;

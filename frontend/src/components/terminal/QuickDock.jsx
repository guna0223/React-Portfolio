import React from 'react';
import { User, Briefcase, Wrench, Clock, Mail, FileText, Sparkles, Layout, Trash2 } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

/**
 * QuickDock — 1-click Command Quick Bar
 * Allows mobile visitors and busy recruiters to instantly trigger commands without typing.
 */
const QuickDock = ({ onExecuteCmd, onToggleView }) => {
  const { playSfx } = useSound();

  const dockItems = [
    { label: 'whoami', icon: User, cmd: 'whoami', highlight: false },
    { label: 'projects', icon: Briefcase, cmd: 'projects', highlight: false },
    { label: 'skills', icon: Wrench, cmd: 'skills', highlight: false },
    { label: 'experience', icon: Clock, cmd: 'experience', highlight: false },
    { label: 'contact', icon: Mail, cmd: 'contact', highlight: false },
    { label: 'resume', icon: FileText, cmd: 'resume', highlight: false },
    { label: 'sudo hire', icon: Sparkles, cmd: 'sudo hire', highlight: true },
  ];

  const handleDockClick = (cmd) => {
    playSfx('click');
    onExecuteCmd(cmd);
  };

  return (
    <div className="quick-dock-container" aria-label="Terminal Quick Command Bar">
      <div className="quick-dock-pill-group">
        {dockItems.map(({ label, icon: Icon, cmd, highlight }) => (
          <button
            key={cmd}
            type="button"
            className={`quick-dock-pill ${highlight ? 'pill-highlight' : ''}`}
            onClick={() => handleDockClick(cmd)}
            title={`Execute command: ${cmd}`}
          >
            <Icon size={12} />
            <span>{label}</span>
          </button>
        ))}

        <div className="quick-dock-divider" />

        <button
          type="button"
          className="quick-dock-pill pill-secondary"
          onClick={() => {
            playSfx('click');
            onToggleView();
          }}
          title="Switch to clean Recruiter Reader View"
        >
          <Layout size={12} />
          <span>Reader View</span>
        </button>

        <button
          type="button"
          className="quick-dock-pill pill-dim"
          onClick={() => handleDockClick('clear')}
          title="Clear screen"
        >
          <Trash2 size={12} />
          <span>clear</span>
        </button>
      </div>
    </div>
  );
};

export default QuickDock;

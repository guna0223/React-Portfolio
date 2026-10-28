import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeModeContext = createContext(null);

export const ThemeModeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme_mode');
    return saved === 'executive' ? 'executive' : 'shinobi';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_theme_mode', themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
    if (themeMode === 'executive') {
      document.body.classList.add('theme-executive');
      document.body.classList.remove('theme-shinobi');
    } else {
      document.body.classList.add('theme-shinobi');
      document.body.classList.remove('theme-executive');
    }
  }, [themeMode]);

  const toggleThemeMode = useCallback(() => {
    setThemeMode((prev) => (prev === 'shinobi' ? 'executive' : 'shinobi'));
  }, []);

  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleThemeMode, isExecutive: themeMode === 'executive' }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    return {
      themeMode: 'shinobi',
      isExecutive: false,
      toggleThemeMode: () => {},
    };
  }
  return ctx;
};

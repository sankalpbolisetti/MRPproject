import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a new context for theme
const ThemeContext = createContext();

// Custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check local storage for saved theme, default to light if none found
  const savedTheme = localStorage.getItem('theme') === 'dark';
  const [darkMode, setDarkMode] = useState(savedTheme);

  // Update local storage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
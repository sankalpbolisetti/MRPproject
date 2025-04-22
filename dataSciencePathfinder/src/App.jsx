import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './AppRoutes';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <AuthProvider>
      {/* <ThemeProvider> */}
      <Router>
        <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Router>
      {/* </ThemeProvider> */}
    </AuthProvider>
  );
};

export default App;

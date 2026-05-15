// src/App.jsx
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import TradingPortfolioPage from './pages/TradingPortfolioPage';
import StreamingPage from './pages/StreamingPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);


  {/* edit page here */}
  if (isAuthenticated) {
    return (
      <TradingPortfolioPage
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        onLogout={() => setIsAuthenticated(false)}
      />
    );
  }

  return (
    <LoginPage
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      onAuthSuccess={() => setIsAuthenticated(true)}
    />
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ContentPageOne from './components/ContentPageOne';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <NavBar toggleTheme={toggleTheme} darkMode={darkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/about" element={<div>About Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} /> */}
            <Route path="/events" element={<ContentPageOne />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

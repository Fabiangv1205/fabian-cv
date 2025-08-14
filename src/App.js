import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import { useTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { Lan } from '@mui/icons-material';
import { LanguageProvider } from './context/LanguageContext';

const AppContent = () => {
  const theme = useTheme();

  return (
    <Router>
      <Navbar />
      <div
        style={{
          padding: '2rem',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => (
  <LanguageProvider>
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  </LanguageProvider>

);

export default App;

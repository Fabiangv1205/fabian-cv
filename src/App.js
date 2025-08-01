import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import { useTheme } from '@mui/material/styles'; // <- IMPORTANTE
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

const AppContent = () => {
  const theme = useTheme();

  return (
    <Router>
      <Navbar />
      <div
        style={{
          padding: '2rem',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: theme.palette.background.default, // ← Dinámico
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => (
  <ThemeContextProvider>
    <AppContent />
  </ThemeContextProvider>
);

export default App;

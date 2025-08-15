import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import { useTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Ishoes from "./pages/projects/Ishoes";
import TeeTime from "./pages/projects/TeeTime";
import Ingresos from "./pages/projects/Ingresos";
import { LanguageProvider } from "./context/LanguageContext";
import MotionPeek from "./pages/projects/MotionPeek";


const AppContent = () => {
  const theme = useTheme();

  return (
    <Router>
      <Navbar />
      <div
        style={{
          padding: "2rem",
          fontFamily: "Arial, sans-serif",
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/projects/motionpeek" element={<MotionPeek />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/ishoes" element={<Ishoes />} />
          <Route path="/projects/teetime" element={<TeeTime />} />
          <Route path="/projects/ingresos" element={<Ingresos />} />
          <Route path="/contact" element={<Contact />} />
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

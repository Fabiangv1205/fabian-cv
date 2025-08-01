import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/skills" style={styles.link}>Skills</Link>
      <Link to="/projects" style={styles.link}>Projects</Link>
      <Link to="/experience" style={styles.link}>Experience</Link>
      <Link to="/contact" style={styles.link}>Contact</Link>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
  }
};

export default Navbar;

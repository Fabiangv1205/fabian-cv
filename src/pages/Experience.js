import React from 'react';

const Experience = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Professional Experience</h2>
      <p style={styles.item}><strong>Freelance Web & Mobile Developer</strong><br />January 2024 – Present</p>
      <p style={styles.item}>Created mobile and web applications using modern stacks, focused on real-world use, performance, and clean maintainable code.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  item: {
    color: '#333',
    marginBottom: '1rem',
  },
};

export default Experience;

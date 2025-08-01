import React from 'react';

const Projects = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Freelance Projects (2024 – Present)</h2>
      <ul style={styles.list}>
        <li>Built cross-platform mobile apps using React Native.</li>
        <li>Designed responsive web interfaces with React.js.</li>
        <li>Developed RESTful APIs with Express.js and Node.js.</li>
        <li>Integrated Firebase for authentication, storage, and notifications.</li>
        <li>Delivered customized, functional applications for real clients.</li>
        <li>Worked directly with clients to define scope, timeline, and deliverables.</li>
        <li>Focused on clean code and intuitive UX.</li>
      </ul>
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
  list: {
    paddingLeft: '1.5rem',
    color: '#333',
  },
};

export default Projects;

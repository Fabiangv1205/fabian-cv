import React from 'react';

const Skills = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Technical Skills</h2>

      <h4 style={styles.subtitle}>Operating Systems</h4>
      <p style={styles.text}>Linux, Windows XP/7/8/10/11</p>

      <h4 style={styles.subtitle}>Automation Tools</h4>
      <p style={styles.text}>Ansible</p>

      <h4 style={styles.subtitle}>Scripting Languages</h4>
      <p style={styles.text}>Bash, Python, JavaScript</p>

      <h4 style={styles.subtitle}>Frameworks & Technologies</h4>
      <p style={styles.text}>Django, React, React Native, Express</p>

      <h4 style={styles.subtitle}>Containers & Virtualization</h4>
      <p style={styles.text}>Docker</p>
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
  subtitle: {
    marginTop: '1rem',
    fontWeight: 'bold',
    color: '#444',
  },
  text: {
    marginBottom: '0.5rem',
    color: '#333',
  },
};

export default Skills;

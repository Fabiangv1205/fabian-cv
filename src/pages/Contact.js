import React from 'react';

const Contact = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact</h2>
      <p style={styles.item}>📧 fabiano.gv.12@gmail.com</p>
      <p style={styles.item}>📞 +52 331 216 0193</p>
      <p style={styles.item}>🌐 fabiandev.org</p>
      <p style={styles.item}>📍 Guadalajara, Jalisco, Mexico</p>
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
    marginBottom: '0.5rem',
    color: '#333',
  },
};

export default Contact;

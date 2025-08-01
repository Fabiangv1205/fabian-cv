import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Roberto Fabián González Vargas</h1>
      <p style={styles.subtitle}>Electronics and Communications Engineer</p>
      <p style={styles.location}>Guadalajara, Jalisco · fabiano.gv.12@gmail.com · +52 331 216 0193</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginTop: '0.5rem',
  },
  location: {
    marginTop: '1rem',
    color: '#333',
  },
};

export default Home;

import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.name}>Roberto Fabián González Vargas</h1>
        <h2 style={styles.title}>Full Stack Developer (Jr)</h2>
        <p style={styles.description}>
          Creating clean, scalable and user-centric web/mobile solutions with React, Firebase and modern dev tools.
        </p>
        <a href="/Roberto_Fabian_Gonzalez_Vargas.pdf" download style={styles.button}>
          📄 Download CV
        </a>
      </section>

      {/* About */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Me</h2>
        <p style={styles.text}>
          I’m a self-taught developer based in Mexico. Passionate about building useful apps with React Native, deploying with Cloudflare, and learning Linux & backend systems every day.
        </p>
      </section>

      {/* Skills */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills Summary</h2>
        <p style={styles.text}>
          JavaScript · React · Firebase · Git · Expo · REST APIs · Linux (Debian) · Cloudflare · Express.js
        </p>
        <a href="/skills" style={styles.link}>🔍 View detailed skills →</a>
      </section>

      {/* Portfolio Preview */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Portfolio Highlights</h2>

        <div style={styles.card}>
          <img src="/images/ishoes.png" alt="iShoes" style={styles.image} />
          <h3 style={styles.cardTitle}>iShoes</h3>
          <p style={styles.text}>
            A mobile e-commerce app with admin dashboard, cloud image storage, and cart animation using React Native + Firebase.
          </p>
        </div>

        <div style={styles.card}>
          <img src="/images/gastos.png" alt="Gastos App" style={styles.image} />
          <h3 style={styles.cardTitle}>Gastos App</h3>
          <p style={styles.text}>
            Expense tracker with weekly summaries, user balances and Firestore integration.
          </p>
        </div>

        <a href="/portfolio" style={styles.link}>🖼️ View full portfolio →</a>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    padding: '40px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    color: '#2c3e50',
    backgroundColor: '#fdfdfd',
  },
  hero: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#f0f4f8',
    borderRadius: '12px',
    marginBottom: '40px',
  },
  name: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '8px',
  },
  title: {
    fontSize: '1.5rem',
    color: '#0077cc',
    marginBottom: '16px',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 20px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#0077cc',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    marginTop: '12px',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: '600',
    marginBottom: '12px',
    borderBottom: '2px solid #eee',
    paddingBottom: '6px',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '12px',
  },
  link: {
    color: '#0077cc',
    textDecoration: 'none',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '16px',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '10px',
  },
};

export default Home;

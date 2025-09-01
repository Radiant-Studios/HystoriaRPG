import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

function Welcome() {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.welcomeContent}>
        <img src="/images/Logo2.png" alt="Selo de Ydra" className={styles.welcomeLogo} />
        <h1>Bem-vindo ao Hystoria</h1>
        <p>A sua plataforma definitiva para criar, gerir e viver as suas maiores aventuras de RPG. Dê vida aos seus personagens, organize as suas campanhas e jogue com amigos, tudo num só lugar.</p>
        <Link to="/auth" className={styles.welcomeButton}>Comece a Aventura</Link>
      </div>
    </section>
  );
}

export default Welcome;
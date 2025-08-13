import React from 'react';
import styles from './EmBrevePage.module.css';

// Vamos usar um ícone de construção da biblioteca react-icons
import { FaHardHat } from 'react-icons/fa';

function EmBrevePage() {
  return (
    // Aplicamos a classe para centralizar o conteúdo
    <div className={styles.mainCentered}>
      <div className={styles.embreveContainer}>
        <div className={styles.embreveIcon}>
          <FaHardHat />
        </div>
        <h1>Em Breve...</h1>
        <p>Esta funcionalidade ainda está em desenvolvimento. A nossa equipe de desenvolvimento está trabalhando para trazer o mais rapido!</p>
      </div>
    </div>
  );
}

export default EmBrevePage;
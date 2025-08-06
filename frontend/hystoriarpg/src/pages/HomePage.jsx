import React from 'react';

// 1. Importa o nosso novo arquivo de CSS
import styles from './HomePage.module.css';

// Importa os componentes da página
import ImageCarousel from '../components/ImageCarousel';
import Features from '../components/Features';
// O Footer agora está no Layout, então não precisamos dele aqui

function HomePage() {
  return (
    // 2. Aplica a nossa nova classe CSS ao container principal
    <div className={styles.homePageContainer}>
      {/* 3. Adiciona um wrapper para o conteúdo, para centralizá-lo */}
      <div className={styles.contentWrapper}>
        <ImageCarousel />
        <Features />
      </div>
    </div>
  );
}

export default HomePage;
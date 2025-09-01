import React from 'react';
import styles from './HomePage.module.css';

// 1. Importa o nosso novo componente de animação
import ScrollReveal from '../components/ScrollReveal';

// Importa os outros componentes da página
import ImageCarousel from '../components/ImageCarousel';
import Welcome from '../components/Welcome';
import Features from '../components/Features';

function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <ScrollReveal>
      <ImageCarousel />
      </ScrollReveal>
      
      <ScrollReveal>
        <Welcome />
      </ScrollReveal>

      <ScrollReveal>
        <Features />
      </ScrollReveal>

      {/* Se você adicionar mais secções no futuro, basta embrulhá-las também */}
      
    </div>
  );
}

export default HomePage;
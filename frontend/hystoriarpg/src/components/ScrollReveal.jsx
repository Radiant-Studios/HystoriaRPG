import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './ScrollReveal.module.css';

// Este componente vai "embrulhar" qualquer outro componente que queiramos animar
const ScrollReveal = ({ children }) => {
  const { ref, inView } = useInView({
    // Opções:
    triggerOnce: true, // A animação acontece apenas uma vez
    threshold: 0.1,    // A animação começa quando 10% do elemento está visível
  });

  return (
    // 1. O 'ref' observa quando este div entra na tela
    // 2. A classe muda para 'visible' quando 'inView' se torna true
    <div ref={ref} className={`${styles.revealContainer} ${inView ? styles.visible : ''}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
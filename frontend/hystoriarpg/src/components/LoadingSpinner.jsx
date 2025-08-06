import React, { useState, useEffect } from 'react';
import styles from './LoadingSpinner.module.css';

const loadingPhrases = [
  'Afiando a espada...',
  'Contando as poções...',
  'Limpando o pó do grimório...',
  'Aprendendo novas magias...',
  'Desenhando o mapa da masmorra...',
  'Conferindo os dados...',
  'Alimentando o dragão de estimação...',
];

function LoadingSpinner() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
    
      setPhraseIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
     
      setAnimationKey(prevKey => prevKey + 1);
    }, 4000); // 4 segundos por frase

    return () => clearInterval(intervalId);
  }, []);

  const currentPhrase = loadingPhrases[phraseIndex];

  return (
    <div className={styles.spinnerContainer}>
      <img
        src="/images/Logo2.png"
        alt="Carregando Hystoria..."
        className={styles.logo}
      />
    
      <div className={styles.loadingText} key={animationKey}>
        {currentPhrase.split('').map((char, index) => (
          <span 
            key={index}
            className={styles.waveChar}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LoadingSpinner;
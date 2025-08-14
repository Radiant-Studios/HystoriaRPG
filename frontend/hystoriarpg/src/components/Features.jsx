import React from 'react';
import styles from './Features.module.css';

// Importa os ícones que vamos usar da biblioteca 'react-icons'
// Fa = Font Awesome, Gi = Game Icons
import { FaAddressCard, FaMapMarkedAlt, FaBookOpen } from 'react-icons/fa';

const featuresData = [
  {
    icon: <FaAddressCard />,
    title: "Fichas Detalhadas",
    description: "Crie e gerencie fichas de personagem completas com atributos, perícias, inventário e magias. Tudo em um só lugar, acessível e fácil de editar."
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Gerencie Campanhas",
    description: "Organize suas aventuras, convide jogadores, crie NPCs e mantenha notas da sessão para que nada se perca durante a jornada."
  },
  {
    icon: <FaBookOpen />,
    title: "Grimório de Magias",
    description: "Um compêndio de magias de Tormenta 20, com filtros e busca para encontrar rapidamente o que você precisa no calor da batalha."
  }
];

function Features() {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>Funcionalidades Principais</h2>
      <div className={styles.cardsContainer}>
        {featuresData.map((feature, index) => (
          <div className={styles.featureCard} key={index}>
            <div className={styles.iconWrapper}>
              {feature.icon}
            </div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
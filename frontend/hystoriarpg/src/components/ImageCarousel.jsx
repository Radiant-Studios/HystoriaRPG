import React from 'react';
import { Carousel } from 'react-responsive-carousel';

// 1. GARANTIA: Verifique se esta linha está presente. Sem ela, o carrossel some!
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import styles from './ImageCarousel.module.css';

const carouselItems = [
  { image: '/images/imagem01.jpg', title: 'Fichas de Personagem Dinâmicas', description: 'Crie e gerencie todas as suas fichas de RPG em um só lugar.' },
  { image: '/images/imagem02.jpg', title: 'Gerencie Suas Campanhas', description: 'Convide jogadores, adicione notas e controle o andamento da sua história.' },
  { image: '/images/imagem03.png', title: 'Rolagem de Dados Integrada', description: 'Ferramentas completas para rolar dados diretamente na plataforma.' }
];

function ImageCarousel() {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        animationHandler="fade"
        swipeable={false}
        autoPlay={true}
        interval={3500} // Aumentei um pouco o tempo
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        {carouselItems.map((item, index) => (
          // A estrutura aqui é a mais simples e robusta
          <div key={index} className={styles.slide}>
            <img src={item.image} alt={item.title} />
            <div className={styles.legend}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
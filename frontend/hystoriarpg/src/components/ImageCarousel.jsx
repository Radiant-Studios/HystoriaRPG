import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import styles from './ImageCarousel.module.css';
import imagemFichas from '../assets/images/imagem01.jpg';
import imagemCampanhas from '../assets/images/imagem02.jpg';
import imagemRolagem from '../assets/images/imagem03.png';

const carouselItems = [
  { 
    image: imagemFichas, 
    title: 'Fichas de Personagem Dinâmicas', 
    description: 'Crie e gerencie todas as suas fichas de RPG em um só lugar.'
  },
  { 
    image: imagemCampanhas, 
    title: 'Gerencie Suas Campanhas', 
    description: 'Convide jogadores, adicione notas e controle o andamento da sua história.' 
  },
  { 
    image: imagemRolagem, 
    title: 'Rolagem de Dados Integrada', 
    description: 'Ferramentas completas para rolar dados diretamente na plataforma.'
  }
];

function ImageCarousel() {
  const [slidePercentage, setSlidePercentage] = useState(60);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setSlidePercentage(100);
      } else if (window.innerWidth < 900) {
        setSlidePercentage(80);
      } else {
        setSlidePercentage(60);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.carouselWrapper}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4200}
        transitionTime={1000}
        showArrows={true}
        swipeable={false}
        emulateTouch={false}
        centerMode={true}
        centerSlidePercentage={slidePercentage}
        stopOnHover={false}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
        useKeyboardArrows={false}
        selectedItem={1}
      >
        {carouselItems.map((item, index) => (
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
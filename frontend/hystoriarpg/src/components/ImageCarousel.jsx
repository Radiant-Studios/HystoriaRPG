import React from 'react';

// 1. Importa os componentes e módulos corretos (agora com EffectFade e Autoplay)
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

// 2. Importa os estilos necessários (o de coverflow já não é preciso)
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './ImageCarousel.module.css';

const carouselItems = [
  { image: '/images/imagem01.jpg', title: 'Fichas de Personagem Dinâmicas', description: 'Crie e gerencie todas as suas fichas de RPG.' },
  { image: '/images/imagem02.jpg', title: 'Gerencie Suas Campanhas', description: 'Convide jogadores e controle a sua história.' },
  { image: '/images/imagem03.png', title: 'Rolagem de Dados Integrada', description: 'Ferramentas completas para rolar dados na plataforma.' }
];

function ImageCarousel() {
  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        // 3. Adiciona os módulos que vamos usar
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        
        // 4. Define o efeito como 'fade'
        effect={'fade'}
        
        // 5. Configura o autoplay
        autoplay={{
          delay: 3500, // Tempo em milissegundos entre cada slide
          disableOnInteraction: false, // Continua a passar mesmo depois de o utilizador interagir
        }}
        
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1} // Mostra apenas 1 slide de cada vez
        navigation={true}
        pagination={{ clickable: true }}
        className={styles.mySwiper}
      >
        {carouselItems.map((item, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <img src={item.image} alt={item.title} />
            <div className={styles.legend}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageCarousel;
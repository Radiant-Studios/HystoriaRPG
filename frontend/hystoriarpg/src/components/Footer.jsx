import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

// Importa os ícones que vamos usar
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContent}>

        {/* --- Coluna 1: Logo e Descrição --- */}
        <div className={styles.footerColumn}>
          <img src="/images/Logo1.png" alt="Hystoria Logo" className={styles.logoFooter} />
          <p>Sua plataforma completa para criar, gerenciar e jogar suas aventuras de RPG com amigos.</p>
        </div>

        {/* --- Coluna 2: Navegação --- */}
        <div className={styles.footerColumn}>
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/fichas">Minhas Fichas</Link></li>
            <li><Link to="/campanhas">Campanhas</Link></li>
            <li><Link to="/grimorio">Grimório</Link></li>
            <li><Link to="/conta">Minha Conta</Link></li>
          </ul>
        </div>

        {/* --- Coluna 3: Suporte --- */}
        <div className={styles.footerColumn}>
          <h4>Suporte</h4>
          <ul>
            <li><Link to="/contato">Contato</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/termos">Termos de Serviço</Link></li>
          </ul>
        </div>
        
        {/* --- Coluna 4: Redes Sociais --- */}
        <div className={styles.footerColumn}>
          <h4>Redes Sociais</h4>
          <div className={styles.socialLinks}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Radiant Studios. Todos os direitos reservados.</p>
      <p className={styles.disclaimer}>
          Tormenta 20 RPG é um produto da Jambô Editora e seus respectivos criadores, todos os direitos reservados.
        </p>
        <p className={styles.disclaimer}>
          Este site é conteúdo de fã não oficial e segue as diretrizes de conteúdo permitido. Não aprovado ou endossado por terceiros.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
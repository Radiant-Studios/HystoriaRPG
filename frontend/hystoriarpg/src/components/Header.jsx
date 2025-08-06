import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import axios from 'axios';
import styles from './Header.module.css';

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // ... (lógica do logout não muda)
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      dispatch(logout());
      // No futuro, podemos querer navegar para '/login' aqui
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <img src="/images/Logo1.png" alt="Hystoria Logo" className={styles.logoImg} />
          </Link>
        </div>

        {/* Adicionei uma div 'menu' para alinhar com a estrutura do seu CSS original */}
        <div className={styles.menu}>
          <nav className={styles.mainNav}>
            <NavLink to="/ficha/nova">Criar Ficha</NavLink>
            <NavLink to="/fichas">Minhas Fichas</NavLink>
            <NavLink to="/campanhas">Campanhas</NavLink>
            <NavLink to="/embreve">Em breve...</NavLink>
          
          </nav>
        </div>
        
        <div className={styles.perfilUsuario}>
          {isAuthenticated && user ? (
            // Usaremos um botão com a imagem de fundo, como no seu CSS
            <button
              onClick={handleLogout}
              className={styles.profileButton}
              style={{ backgroundImage: `url(${user.foto_perfil_url || '/images/default-avatar.jpg'})` }}
              title="Sair" // Tooltip para acessibilidade
            ></button>
          ) : (
            <Link to="/login" className="alguma-classe-para-login-button">Entrar</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
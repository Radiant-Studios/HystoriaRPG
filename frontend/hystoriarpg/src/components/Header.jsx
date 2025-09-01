import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import axios from 'axios';
import styles from './Header.module.css';

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // 1. NOVO ESTADO para controlar a visibilidade do dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referência para o menu, para saber se clicámos fora

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      dispatch(logout());
      setIsMenuOpen(false); // Fecha o menu ao sair
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // 2. EFEITO para fechar o menu se o utilizador clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    // Adiciona o listener quando o menu está aberto
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // Remove o listener quando o componente é desmontado ou o menu fecha
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);


  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <img src="/images/Logo1.png" alt="Hystoria Logo" className={styles.logoImg} />
          </Link>
        </div>

        <div className={styles.menu}>
          <nav className={styles.mainNav}>
            <NavLink to="/fichas/nova">Criar Ficha</NavLink>
            <NavLink to="/fichas">Minhas Fichas</NavLink>
            <NavLink to="/campanhas">Campanhas</NavLink>
            <NavLink to="/embreve">Em breve...</NavLink>
          </nav>
        </div>
        
        <div className={styles.perfilUsuario} ref={menuRef}>
          {isAuthenticated && user ? (
            <>
              <button
                // 3. O clique no botão agora abre/fecha o menu
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={styles.profileButton}
                style={{ backgroundImage: `url(${user.foto_perfil_url || '/images/default-avatar.jpg'})` }}
                title="Menu do Utilizador"
              ></button>

              {/* 4. O MENU DROPDOWN (só aparece se isMenuOpen for true) */}
              {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                  <ul>
                    <li><Link to="/configuracoes" onClick={() => setIsMenuOpen(false)}>Configurações</Link></li>
                    <li><button onClick={handleLogout}>Sair</button></li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/auth" className={styles.loginButton}>Entrar</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
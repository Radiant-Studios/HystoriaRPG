import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
// 1. Importa o nosso novo arquivo de estilo
import styles from './Layout.module.css';

function Layout() {
  return (
    // 2. Aplica a classe que define o layout flex e a altura mínima
    <div className={styles.appLayout}>
      <Header />
      {/* 3. Aplica a classe que faz o conteúdo se esticar */}
      <main className={styles.pageContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
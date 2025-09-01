import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Este componente vai detetar mudanças de rota e rolar a página para o topo
function ScrollToTop() {
  // O hook 'useLocation' dá-nos acesso à informação da rota atual
  const { pathname } = useLocation();

  // O hook 'useEffect' vai ser executado sempre que o 'pathname' (a URL) mudar
  useEffect(() => {
    // Ação: rola a janela para a posição x=0, y=0 (o topo)
    window.scrollTo(0, 0);
  }, [pathname]); // A dependência [pathname] garante que isto só acontece em mudanças de página

  // Este componente não renderiza nada no ecrã
  return null;
}

export default ScrollToTop;
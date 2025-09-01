import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Importe a nova ação e o seu LoadingSpinner
import { checkAuthStatus } from './redux/authSlice';
import LoadingSpinner from './components/LoadingSpinner'; 

// ... outros imports
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import FichasPage from './pages/FichasPage';
import FichaDetalhadaPage from './pages/FichaDetalhadaPage';
import NovaFichaPage from './pages/NovaFichaPage';
import CampanhasPage from './pages/campanhasPage';
import EmBrevePage from './pages/EmBrevePage';
import ConfiguracoesPage from './pages/ConfiguracoesPage';
import ScrollToTop from 'components/ScrollToTop';
// ... etc

function App() {
  const dispatch = useDispatch();
  // Busca o status diretamente do Redux
  const authStatus = useSelector((state) => state.auth.status);

  // 2. ESTE useEffect é executado apenas uma vez quando a App é montada
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // 3. Enquanto o status for 'idle' ou 'loading', mostra o spinner
  //    Isto impede que a aplicação mostre qualquer página antes de saber se o utilizador está logado
  if (authStatus === 'idle' || authStatus === 'loading') {
    return <LoadingSpinner />;
  }

  // 4. Apenas depois da verificação, renderiza as rotas
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/registrar" element={<Navigate to="/auth" replace />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route element={<PrivateRoute />}>
            <Route path="fichas" element={<FichasPage />} />
            <Route path="fichas/:id" element={<FichaDetalhadaPage />} />
            <Route path="fichas/nova" element={<NovaFichaPage />} />
            <Route path="campanhas" element={<CampanhasPage />} />
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
          </Route>

          <Route path="embreve" element={<EmBrevePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
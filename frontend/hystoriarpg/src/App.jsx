import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importa os Layouts e Componentes
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute'; // <-- IMPORTA O NOSSO PORTEIRO

// Importa as Páginas
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import FichasPage from './pages/FichasPage';
import DetalheFichaPage from './pages/DetalheFichaPage';
import NovaFichaPage from './pages/NovaFichaPage';
import CampanhasPage from './pages/campanhasPage';
import EmBrevePage from './pages/EmBrevePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Autenticação (pública, fora de qualquer layout) */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/registrar" element={<Navigate to="/auth" replace />} />
        
        {/* Rotas que usam o Layout principal (com Header e Footer) */}
        <Route path="/" element={<Layout />}>
            
            {/* Rota da Homepage (pública) */}
            <Route index element={<HomePage />} />

            {/* AQUI ESTÁ A MÁGICA: Rotas que precisam de autenticação */}
            <Route element={<PrivateRoute />}>
                <Route path="fichas" element={<FichasPage />} />
                <Route path="ficha/:id" element={<DetalheFichaPage />} />
                <Route path="fichas/nova" element={<NovaFichaPage />} />
                <Route path="campanhas" element={<CampanhasPage />} />
                {/* Adicione outras rotas privadas aqui no futuro */}
            </Route>

            {/* Rota "Em Breve" (pode ser pública) */}
            <Route path="embreve" element={<EmBrevePage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
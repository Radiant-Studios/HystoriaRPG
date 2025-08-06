import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Importe o Layout e a nova HomePage
import Layout from './components/Layout';
import HomePage from './pages/HomePage'; // <-- IMPORTAR

// Importe as outras páginas
import LoginPage from './pages/LoginPage';
import FichasPage from './pages/FichasPage';
import DetalheFichaPage from './pages/DetalheFichaPage';
import NovaFichaPage from './pages/NovaFichaPage';
import RegistroPage from './pages/RegistroPage';
// (Seu componente PrivateRoute continua o mesmo)
const PrivateRoute = ({ children }) => {
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Agora, todas as rotas principais ficam dentro do Layout */}
        <Route path="/" element={<Layout />}>
          {/* A rota "index" é a que aparece quando o caminho é exatamente "/" */}
          <Route index element={<HomePage />} />
          
          <Route path="fichas" element={/*<PrivateRoute>*/<FichasPage />/*</PrivateRoute>*/} />
          <Route path="ficha/:id" element={/*<PrivateRoute>*/<DetalheFichaPage />/*</PrivateRoute>*/} />
          <Route path="fichas/nova" element={/*<PrivateRoute>*/<NovaFichaPage />/*</PrivateRoute>*/} />
        </Route>
        
        {/* A rota de login continua fora do Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrar" element={<RegistroPage />} />
        
        {/* Rota de fallback para 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
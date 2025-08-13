import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Apenas verifica o estado atual de autenticação no Redux
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Se estiver autenticado, mostra a página. Se não, redireciona para a autenticação.
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
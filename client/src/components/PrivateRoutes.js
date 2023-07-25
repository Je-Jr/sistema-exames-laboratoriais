import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem('token');

  // Função para verificar se o token está expirado
  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true; // Token não existe, considera como expirado
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000; // Timestamp da expiração em milissegundos
    const currentTime = Date.now();
    return currentTime > expirationTime;
  };

  if (!isAuthenticated || isTokenExpired()) {
    // Redirecionar para a página de login se não estiver autenticado ou o token estiver expirado
    localStorage.removeItem('token'); // Remover o token expirado
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default PrivateRoutes;

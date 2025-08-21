import { Navigate } from 'react-router-dom';
import React from 'react';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export { ProtectedRoute };

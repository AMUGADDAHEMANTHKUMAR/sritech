import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = sessionStorage.getItem('sritech_admin_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

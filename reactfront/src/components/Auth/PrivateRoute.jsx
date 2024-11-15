// src/components/Auth/PrivateRoute.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { authToken } = useContext(AuthContext);
  return authToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRouteProtection } from '../store/RouteContext';

const RouteGuard = ({ children }) => {
  const { allowedRoute, setAllowedRoute } = useRouteProtection();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user has escaped the Matrix
    const hasEscapedMatrix = localStorage.getItem('matrixEscaped') === 'true';
    
    // If user has escaped Matrix, allow all routes
    if (hasEscapedMatrix) {
      setAllowedRoute('*');
      return;
    }
    
    // If user hasn't escaped the Matrix and trying to access a restricted route
    if (!hasEscapedMatrix && allowedRoute !== '*' && location.pathname !== allowedRoute) {
      navigate(allowedRoute, { replace: true });
    }
  }, [allowedRoute, location.pathname, navigate, setAllowedRoute]);

  return children;
};

export default RouteGuard;

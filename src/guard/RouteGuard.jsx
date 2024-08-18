import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRouteProtection } from '../store/RouteContext';

const RouteGuard = ({ children }) => {
  const { allowedRoute } = useRouteProtection();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Check if the current location is allowed
    if (location.pathname !== allowedRoute) {
      navigate(allowedRoute, { replace: true });
    }
  }, [allowedRoute, location.pathname, navigate]);

  return children;
};

export default RouteGuard;

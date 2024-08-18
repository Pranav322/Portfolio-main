import React, { createContext, useContext, useState } from 'react';

const RouteProtectionContext = createContext();

export const RouteProtectionProvider = ({ children }) => {
  const [allowedRoute, setAllowedRoute] = useState('/');

  return (
    <RouteProtectionContext.Provider value={{ allowedRoute, setAllowedRoute }}>
      {children}
    </RouteProtectionContext.Provider>
  );
};

export const useRouteProtection = () => useContext(RouteProtectionContext);

import React, { createContext, useState, useContext } from 'react';

// Create a context
const WheelContext = createContext();

// Create a provider component
export function WheelProvider({ children }) {
  const [show, setShow] = useState(false);

  const value = {
    show,
    setShow,
  };

  return (
    <WheelContext.Provider value={value}>
      {children}
    </WheelContext.Provider>
  );
}

// Custom hook to use the WheelContext
export function useWheel() {
  return useContext(WheelContext);
}

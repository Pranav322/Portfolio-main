// src/GlobalStateContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
    const [show, setShow] = useState(true);

    return (
        <GlobalStateContext.Provider value={{ show, setShow }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

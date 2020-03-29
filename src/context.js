import React, { createContext, useContext } from "react";

// Create Context Object
export const StateContext = createContext();

export const StateProvider = ({ initialState, children }) => (
  <StateContext.Provider value={{ ...initialState }}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

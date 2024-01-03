import React, { createContext, useState, useContext } from "react";

export const AdidasContext = createContext();

export const AdidasProvider = ({ children }) => {
  const [adidasCustomization, setAdidasCustomization] = useState({
    orderImage: null,
    placement: "",
    notes: ""
  });

  return (
    <AdidasContext.Provider
      value={{ adidasCustomization, setAdidasCustomization }}
    >
      {children}
    </AdidasContext.Provider>
  );
};

export const useAdidasContext = () => useContext(AdidasContext);

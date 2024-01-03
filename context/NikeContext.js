import React, { createContext, useState, useContext } from "react";

export const NikeContext = createContext();

export const NikeProvider = ({ children }) => {
  const [nikeCustomization, setNikeCustomization] = useState({
    orderImage: null,
    placement: "",
    color: "",
    notes: ""
  });

  return (
    <NikeContext.Provider value={{ nikeCustomization, setNikeCustomization }}>
      {children}
    </NikeContext.Provider>
  );
};

export const useNikeContext = () => useContext(NikeContext);

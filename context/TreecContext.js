import React, { createContext, useState, useContext } from "react";

export const TreecContext = createContext();

export const TreecProvider = ({ children }) => {
  const [treecCustomization, setTreecCustomization] = useState({
    orderImage: null,
    placement: "",
    nikeSwooshColor: "",
    notes: "",
    colors: []
  });

  return (
    <TreecContext.Provider
      value={{ treecCustomization, setTreecCustomization }}
    >
      {children}
    </TreecContext.Provider>
  );
};

export const useTreecContext = () => useContext(TreecContext);

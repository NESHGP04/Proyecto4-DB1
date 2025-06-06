import { createContext, useContext, useState } from "react";

const TemporadaContext = createContext();

export const TemporadaProvider = ({ children }) => {
  const [temporadaSeleccionada, setTemporadaSeleccionada] = useState(null);

  return (
    <TemporadaContext.Provider value={{ temporadaSeleccionada, setTemporadaSeleccionada }}>
      {children}
    </TemporadaContext.Provider>
  );
};

export const useTemporada = () => useContext(TemporadaContext);

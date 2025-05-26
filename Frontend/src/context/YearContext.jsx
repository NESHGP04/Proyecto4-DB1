import { createContext, useState, useContext } from 'react';

const YearContext = createContext();

export function YearProvider({ children }) {
  const [year, setYear] = useState(2024); // Año inicial fijo

  return (
    <YearContext.Provider value={{ year, setYear }}>
      {children}
    </YearContext.Provider>
  );
}

export function useYear() {
  return useContext(YearContext);
}

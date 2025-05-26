import { createContext, useContext, useState } from 'react';

const DivisionContext = createContext();

export function DivisionProvider({ children }) {
    const [division, setDivision] = useState('Norte');
    return (
        <DivisionContext.Provider value={{ division, setDivision }}>
            {children}
        </DivisionContext.Provider>
    );
}

export const useDivision = () => useContext(DivisionContext);

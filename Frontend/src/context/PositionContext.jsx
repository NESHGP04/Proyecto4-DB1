import { createContext, useContext, useState } from 'react';

const PositionContext = createContext();

export function PositionProvider({ children }) {
    const [position, setPosition] = useState('Norte');
    return (
        <PositionContext.Provider value={{ position, setPosition }}>
            {children}
        </PositionContext.Provider>
    );
}

export const usePosition = () => useContext(PositionContext);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/index.css'
import App from './App.jsx'
import { YearProvider } from './context/YearContext.jsx'
import { DivisionProvider } from './context/DivisionContext.jsx'
import { PositionProvider } from './context/PositionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <YearProvider>
      <PositionProvider>
        <DivisionProvider>
          <App />
        </DivisionProvider>
      </PositionProvider>
    </YearProvider>
  </StrictMode>,
)

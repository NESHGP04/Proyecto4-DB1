import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/index.css'
import App from './App.jsx'
import { DivisionProvider } from './context/DivisionContext.jsx'
import { PositionProvider } from './context/PositionContext.jsx'
import { TeamProvider } from './context/TeamContext.jsx'
import { TemporadaProvider } from './context/TemporadaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemporadaProvider>
      <PositionProvider>
        <DivisionProvider>
          <TeamProvider>
            <App />
          </TeamProvider>
        </DivisionProvider>
      </PositionProvider>
    </TemporadaProvider>
  </StrictMode>,
)

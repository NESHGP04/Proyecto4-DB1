import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@styles/App.css'

import Stats from '@pages/Stats';
import Positions from '@pages/Positions';
import Bat from '@pages/Bat';
import Picheo from '@pages/Picheo';
import Filder from '@pages/Filder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Stats />} />

        {/* Stats */}
        <Route path="/positions" element={<Positions />} />
        <Route path="/bat-stat" element={<Bat />} />
        <Route path="/pitcher-stat" element={<Picheo />} />
        <Route path="/filder-stat" element={<Filder />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App

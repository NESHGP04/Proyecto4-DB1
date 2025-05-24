import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@styles/App.css'

import Stats from '@pages/Stats';
import Positions from '@pages/Positions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Stats />} />

        <Route path="/positions" element={<Positions />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App

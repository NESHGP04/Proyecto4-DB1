import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@styles/App.css'

import Home from '@pages/Home'
import Stats from '@pages/Stats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        <Route path="/stats" element={<Stats />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App

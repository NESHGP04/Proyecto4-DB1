import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@styles/App.css'

import Stats from '@pages/Stats';
import Positions from '@pages/Positions';
import Bat from '@pages/Bat';
import Picheo from '@pages/Picheo';
import Filder from '@pages/Filder';

import Divisions from '@pages/Divisiones';
import TeamsDivision from '@pages/TeamsDivision';
import DetailPlayer from '@pages/DetailPlayer';
import EditPage from '@components/divisiones/detailDivision/EditPage';

import Inscription from '@pages/Inscription';

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

        {/* Divisiones */}
        <Route path="/divisions" element={<Divisions />} />
        <Route path="/teams-division/:division/:year" element={<TeamsDivision />} />
        <Route path="/player/:id" element={<DetailPlayer />} />
        <Route path="/player/:id/edit" element={<EditPage />} />

        {/* Inscription */}
        <Route path="/inscription" element={<Inscription />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App

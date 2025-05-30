import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '@styles/Calendar.css';
import { useDivision } from '@context/DivisionContext';

const juegosProgramados = [
  { fecha: '2025-06-01', equipo: 'Tigres vs León', division: 'Norte' },
  { fecha: '2025-06-04', equipo: 'Águilas vs Jaguares', division: 'Sur' },
  { fecha: '2025-06-08', equipo: 'Pumas vs Lobos', division: 'Este' },
  { fecha: '2025-06-12', equipo: 'Panteras vs Cóndores', division: 'Oeste' },
];

function Calendario() {
  const [value, setValue] = useState(new Date());
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const { division } = useDivision();

  // Filtramos los partidos según la división actual
  const juegosDeDivision = juegosProgramados.filter(j => j.division === division);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const fechaStr = date.toISOString().split('T')[0];
      const juego = juegosDeDivision.find(j => j.fecha === fechaStr);
      if (juego) {
        return <div className="juego-dia">🥎</div>;
      }
    }
    return null;
  };

  const handleDateChange = (date) => {
    setValue(date);
    const fechaStr = date.toISOString().split('T')[0];
    const juego = juegosDeDivision.find(j => j.fecha === fechaStr);
    setJuegoSeleccionado(juego || null);
  };

  return (
    <div className='calendario-prueba'>
      <Calendar
        onChange={handleDateChange}
        value={value}
        className="custom-calendar"
        tileContent={tileContent}
      />

      {juegoSeleccionado && (
        <div className="detalle-juego">
          <h3>Juego programado:</h3>
          <p><strong>Fecha:</strong> {juegoSeleccionado.fecha}</p>
          <p><strong>Partido:</strong> {juegoSeleccionado.equipo}</p>
          <p><strong>División:</strong> {juegoSeleccionado.division}</p>
        </div>
      )}
    </div>
  );
}

export default Calendario;

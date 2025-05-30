import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '@styles/Calendar.css';
import { useDivision } from '@context/DivisionContext';

const juegosProgramados = [
  { fecha: '2024-01-01', equipo: 'Tigres vs León', division: 'Norte' },
  { fecha: '2024-01-01', equipo: 'Otro vs Otro2', division: 'Norte' },
  { fecha: '2024-01-04', equipo: 'Águilas vs Jaguares', division: 'Sur' },
  { fecha: '2024-01-08', equipo: 'Pumas vs Lobos', division: 'Este' },
  { fecha: '2024-01-12', equipo: 'Panteras vs Cóndores', division: 'Oeste' },
];

function Calendario() {
  const [value, setValue] = useState(new Date('2024-01-01'));
  const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);
  const { division } = useDivision();

  // Filtramos los partidos según la división actual
  const juegosDeDivision = juegosProgramados.filter(j => j.division === division);

  const tileContent = ({ date, view }) => {
  if (view === 'month') {
    const fechaStr = date.toISOString().split('T')[0];
    const juegosDelDia = juegosDeDivision.filter(j => j.fecha === fechaStr);
    if (juegosDelDia.length > 0) {
      return (
        <div className="juego-dia">
          <span>🥎</span>
        </div>
      );
    }
  }
  return null;
};

  const handleDateChange = (date) => {
  setValue(date);
  const fechaStr = date.toISOString().split('T')[0];
  const juegosDelDia = juegosDeDivision.filter(j => j.fecha === fechaStr);
  setJuegosSeleccionados(juegosDelDia);
};

  return (
    <div className='calendario-prueba'>
      <Calendar
        onChange={handleDateChange}
        value={value}
        className="custom-calendar"
        tileContent={tileContent}
      />

      {juegosSeleccionados.length > 0 && (
        <div className="detalle-juego">
            <h3>Juegos programados:</h3>
            {juegosSeleccionados.map((juego, index) => (
            <div key={index}>
                <p><strong>Fecha:</strong> {juego.fecha}</p>
                <p><strong>Partido:</strong> {juego.equipo}</p>
                <p><strong>División:</strong> {juego.division}</p>
                <hr />
            </div>
            ))}
        </div>
        )}

    </div>
  );
}

export default Calendario;

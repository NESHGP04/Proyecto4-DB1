import { useState } from 'react';
import Calendar from 'react-calendar';
import '@styles/Calendar.css';
import { useDivision } from '@context/DivisionContext';
import { usePartidos } from '@/hooks/usePartidos';
//import { useCalendario } from '@/hooks/useCalendario';

function Calendario() {
  const [value, setValue] = useState(new Date('2024-01-02'));
  const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);
  const { division } = useDivision();

  const { partidos, loading } = usePartidos(
    division ? { divisionId: division.id } : {}
  );

    // Filtrar por división
  const juegosDeDivision = partidos.filter(j => {
    const divisionLocal = j.equipos_partidos_equipo_local_idToequipos?.division_id;
    const divisionVisitante = j.equipos_partidos_equipo_visitante_idToequipos?.division_id;
    return divisionLocal === division?.id || divisionVisitante === division?.id;
  });

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const fechaStr = date.toISOString().split('T')[0];
      const juegosDelDia = juegosDeDivision.filter(j => {
        const partidoFecha = new Date(j.fecha_hora).toISOString().split('T')[0];
        return partidoFecha === fechaStr;
      });
      if (juegosDelDia.length > 0) {
        return (
        <div className="juego-dia">
          {juegosDelDia.map((j, i) => (
            <div key={i} className="iconito">
              🥎
            </div>
          ))}
        </div>
      );
      }
    }
    return null;
  };

  // Cuando se selecciona una fecha
  const handleDateChange = (date) => {
    setValue(date);
    const fechaStr = date.toISOString().split('T')[0];

    const juegosDelDia = juegosDeDivision.filter(j => {
      const partidoFecha = new Date(j.fecha_hora).toISOString().split('T')[0];
      return partidoFecha === fechaStr;
    });

    setJuegosSeleccionados(juegosDelDia);
  };

  console.log('DIVISION ACTUAL:', division);
  console.log('Partidos desde hook:', partidos);

  return (
    <div className='calendario-prueba'>
      
        <>
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
                  <p><strong>Fecha:</strong> {new Date(juego.fecha_hora).toLocaleString()}</p>
                  <p><strong>Partido:</strong> {juego.equipos_partidos_equipo_local_idToequipos?.nombre} vs {juego.equipos_partidos_equipo_visitante_idToequipos?.nombre}</p>
                  <p><strong>División:</strong> {division?.nombre}</p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </>
      
    </div>
  );
}

export default Calendario;

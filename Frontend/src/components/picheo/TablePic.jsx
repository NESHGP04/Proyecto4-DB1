import { useState } from 'react';
import { useDivision } from '@/context/DivisionContext'; // importa el contexto

// Simulación de datos
const rows = [
  {
    id: 1, nombre: "Juan", division: "Norte", average: 0.75, ganados: 9, perdidos: 3, total: 12, equipo: "AA"
  },
  {
    id: 2, nombre: "Pepe", division: "Sur", average: 0.60, ganados: 6, perdidos: 4, total: 10,  equipo: "BB"
  },
  {
    id: 3, nombre: "José", division: "Norte", average: 0.85, ganados: 17, perdidos: 3, total: 20,  equipo: "CC"
  },
];

function TablePos() {
  const { division } = useDivision(); // usa división global
  const [search, setSearch] = useState('');

  // Filtrar y ordenar
  const filteredRows = rows
    .filter(emp => emp.division === division)
    .filter(emp =>
      emp.nombre?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.average - a.average); // ordenar por average descendente

  return (
    <div className="table-container">
        <p>% Ganados y Perdidos</p>
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>EQP</th>
            <th>Ave.</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((emp, index) => (
            <tr
              key={emp.id}
              className="position-row"
            >
              <td>
                {emp.nombre}
              </td>
              <td>{emp.equipo}</td>
              <td>{emp.average.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

    <p>Efectividad</p>
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>EQP</th>
            <th>Ave.</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((emp, index) => (
            <tr
              key={emp.id}
              className="position-row"
            >
              <td>
                {emp.nombre}
              </td>
              <td>{emp.equipo}</td>
              <td>{emp.average.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Juegos Ganados</p>
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>EQP</th>
            <th>Ave.</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((emp, index) => (
            <tr
              key={emp.id}
              className="position-row"
            >
              <td>
                {emp.nombre}
              </td>
              <td>{emp.equipo}</td>
              <td>{emp.average.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Ponches</p>
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>EQP</th>
            <th>Ave.</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((emp, index) => (
            <tr
              key={emp.id}
              className="position-row"
            >
              <td>
                {emp.nombre}
              </td>
              <td>{emp.equipo}</td>
              <td>{emp.average.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default TablePos;

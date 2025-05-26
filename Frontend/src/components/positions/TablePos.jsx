import { useState } from 'react';
import { useDivision } from '@/context/DivisionContext'; // importa el contexto

// Simulación de datos
const rows = [
  {
    id: 1, nombre: "Equipo A", division: "Norte", average: 0.75, ganados: 9, perdidos: 3, total: 12
  },
  {
    id: 2, nombre: "Equipo B", division: "Sur", average: 0.60, ganados: 6, perdidos: 4, total: 10
  },
  {
    id: 3, nombre: "Equipo C", division: "Norte", average: 0.85, ganados: 17, perdidos: 3, total: 20
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

    // Calcular totales
  const totalGanados = filteredRows.reduce((sum, emp) => sum + emp.ganados, 0);
  const totalPerdidos = filteredRows.reduce((sum, emp) => sum + emp.perdidos, 0);
  const totalJugados = filteredRows.reduce((sum, emp) => sum + emp.total, 0);
  const totalAverage = filteredRows.length > 0
    ? (filteredRows.reduce((sum, emp) => sum + emp.average, 0) / filteredRows.length).toFixed(3)
    : "0.000";

  return (
    <div className="table-container">

      <table className="position-table">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Posición</th>
            <th>Ave.</th>
            <th>JG</th>
            <th>JP</th>
            <th>TJ</th>
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
              <td>{index + 1}</td>
              <td>{emp.average.toFixed(3)}</td>
              <td>{emp.ganados}</td>
              <td>{emp.perdidos}</td>
              <td>{emp.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="totals-row">
            <td><strong>Totales</strong></td>
            <td>-</td>
            <td><strong>{totalAverage}</strong></td>
            <td><strong>{totalGanados}</strong></td>
            <td><strong>{totalPerdidos}</strong></td>
            <td><strong>{totalJugados}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TablePos;

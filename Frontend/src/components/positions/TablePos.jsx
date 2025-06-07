import { useState, useEffect } from "react";
import { useDivision } from "@/context/DivisionContext"; // importa el contexto

function TablePos() {
  const { division } = useDivision(); // usa división global
  const [search, setSearch] = useState("");
  const [rankings, setRankings] = useState([]);

  //Llamada api
  useEffect(() => {
    if (division) {
      fetch(`http://localhost:3001/api/ranking_equipos_torneo`) // ajusta al path correcto
        .then((res) => res.json())
        .then((data) => {
          const filtrados = data.filter(
            (item) => item.division.id === parseInt(division)
          );
          const mapeados = filtrados.map((item) => ({
            id: item.id,
            nombre: item.equipos.nombre,
            division: item.division.nombre,
            average: calcularAverage(item),
            ganados: item.partidos_ganados,
            perdidos: item.partidos_perdidos,
            total:
              (item.partidos_ganados ?? 0) +
              (item.partidos_perdidos ?? 0) +
              (item.partidos_empatados ?? 0),
          }));
          setRankings(mapeados);
        })
        .catch((err) => console.error("Error al cargar rankings:", err));
    } else {
      setRankings([]);
    }
  }, [division]);

  const calcularAverage = (item) => {
    const total =
      (item.partidos_ganados ?? 0) +
      (item.partidos_perdidos ?? 0) +
      (item.partidos_empatados ?? 0);
    return total > 0 ? item.partidos_ganados / total : 0;
  };

  const filteredRows = rankings
    .filter((emp) => emp.nombre?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.average - a.average); // orden por average descendente

  // Calcular totales
  const totalGanados = filteredRows.reduce((sum, emp) => sum + emp.ganados, 0);
  const totalPerdidos = filteredRows.reduce(
    (sum, emp) => sum + emp.perdidos,
    0
  );
  const totalJugados = filteredRows.reduce((sum, emp) => sum + emp.total, 0);
  const totalAverage =
    filteredRows.length > 0
      ? (
          filteredRows.reduce((sum, emp) => sum + emp.average, 0) /
          filteredRows.length
        ).toFixed(3)
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
            <tr key={emp.id} className="position-row">
              <td>{emp.nombre}</td>
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
            <td>
              <strong>Totales</strong>
            </td>
            <td>-</td>
            <td>
              <strong>{totalAverage}</strong>
            </td>
            <td>
              <strong>{totalGanados}</strong>
            </td>
            <td>
              <strong>{totalPerdidos}</strong>
            </td>
            <td>
              <strong>{totalJugados}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TablePos;

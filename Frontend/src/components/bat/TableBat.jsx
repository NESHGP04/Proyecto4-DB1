import { useState, useEffect } from "react";
import { useTemporada } from "@/context/TemporadaContext";
import { useDivision } from "@/context/DivisionContext";

export default function TablePos() {
  const { temporadaSeleccionada } = useTemporada();
  const temporadaId = temporadaSeleccionada?.id;
  const { division } = useDivision();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!temporadaId) return;
    setLoading(true);

    fetch(`http://localhost:3001/api/cosas_extra/stats/atbat/${temporadaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron obtener las estadísticas");
        return res.json();
      })
      .then((data) => {
        const parsed = data.map((emp) => ({
          ...emp,
          average: parseFloat(emp.average),
          ganados: Number(emp.ganados),
          perdidos: Number(emp.perdidos),
        }));
        setRows(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [temporadaId]);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (error) return <div>Error al cargar estadísticas.</div>;

  const filteredRows = rows
    .filter((emp) => emp.division === division)
    .sort((a, b) => b.average - a.average);

  return (
    <div className="table-container">
      <p>Porcentajes</p>
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>EQP</th>
            <th>Ave.</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((emp) => (
            <tr key={emp.id} className="position-row">
              <td>{emp.nombre}</td>
              <td>{emp.equipo}</td>
              <td>{emp.average.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>HOMERUN</p>
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>EQP</th>
            <th>TH</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((emp) => (
            <tr key={emp.id} className="position-row">
              <td>{emp.nombre}</td>
              <td>{emp.equipo}</td>
              <td>{emp.ganados}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>CARRERAS ANOTADAS</p>
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>EQP</th>
            <th>H1</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((emp) => (
            <tr key={emp.id} className="position-row">
              <td>{emp.nombre}</td>
              <td>{emp.equipo}</td>
              <td>{emp.perdidos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

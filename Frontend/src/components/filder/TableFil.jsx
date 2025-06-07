// src/components/filder/TableFil.jsx
import { useState, useEffect } from "react";
import { useTemporada } from "@context/TemporadaContext";

export default function TableFil() {
  const { temporadaSeleccionada } = useTemporada();
  const temporadaId = temporadaSeleccionada?.id;

  const [fielders, setFielders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!temporadaId) return;
    setLoading(true);

    fetch(`http://localhost:3001/api/cosas_extra/stats/fielders/${temporadaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron obtener las estadísticas");
        return res.json();
      })
      .then((data) => {
        // Convertir average de string a número
        const parsed = data.map((emp) => ({
          ...emp,
          average: parseFloat(emp.average),
        }));
        setFielders(parsed);
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

  const sorted = [...fielders].sort((a, b) => b.average - a.average);

  return (
    <div className="table-container">
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>EQP</th>
            <th>Ave.</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((emp) => (
            <tr key={emp.id} className="position-row">
              <td>{emp.nombre}</td>
              <td>{emp.equipo}</td>
              <td>{emp.average.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

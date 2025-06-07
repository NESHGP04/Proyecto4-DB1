import { useState, useEffect } from "react";
import { useTemporada } from "@/context/TemporadaContext";

export default function TablePos() {
  const { temporadaSeleccionada } = useTemporada();
  const temporadaId = temporadaSeleccionada?.id;

  const [pitchers, setPitchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!temporadaId) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/cosas_extra/stats/pitchers/${temporadaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron obtener las estadísticas");
        return res.json();
      })
      .then((data) => {
        // Aseguramos que los campos numéricos estén en formato number
        const parsed = data.map((emp) => ({
          ...emp,
          ganados: Number(emp.ganados),
          perdidos: Number(emp.perdidos),
          juegos_ganados: Number(emp.ganados),
          efectividad: parseFloat(emp.efectividad),
          ponches: Number(emp.ponches),
        }));
        setPitchers(parsed);
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

  // Para mantener el mismo formato, usamos el array ordenado por ganados descendente
  const sorted = [...pitchers].sort(
    (a, b) => b.juegos_ganados - a.juegos_ganados
  );

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
          {sorted.map((emp) => {
            const pct = (emp.ganados / (emp.ganados + emp.perdidos)) * 100;
            return (
              <tr key={emp.id} className="position-row">
                <td>{emp.nombre}</td>
                <td>{emp.equipo}</td>
                <td>{pct.toFixed(3)}%</td>
              </tr>
            );
          })}
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
          {sorted.map((emp) => (
            <tr key={emp.id} className="position-row">
              <td>{emp.nombre}</td>
              <td>{emp.equipo}</td>
              <td>{emp.efectividad.toFixed(3)}</td>
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
          {sorted.map((emp) => (
            <tr key={emp.id} className="position-row">
              <td>{emp.nombre}</td>
              <td>{emp.equipo}</td>
              <td>{emp.juegos_ganados}</td>
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
          {sorted.map((emp) => (
            <tr key={emp.id} className="position-row">
              <td>{emp.nombre}</td>
              <td>{emp.equipo}</td>
              <td>{emp.ponches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

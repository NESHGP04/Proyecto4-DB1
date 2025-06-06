import { useState, useEffect } from "react";

export function useEstadisticas(jugadorId, divisionId, equipoId) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Asegurarse de que al menos división o equipo estén definidos
  if (!divisionId && !equipoId) return;

  const params = new URLSearchParams();
  if (jugadorId) params.append("jugadorId", jugadorId);
  if (divisionId) params.append("divisionId", divisionId);
  if (equipoId) params.append("equipoId", equipoId);

  fetch(`http://localhost:3001/api/estadisticas_jugador/filter?${params}`)
    .then((res) => res.json())
    .then((data) => {
      setStats(data.map((item) => ({
        id: item.jugador_id,
        nombre: item.jugadores.nombre,
        equipo: item.jugadores.equipo_id,
        AB: item.partidos_jugados, 
        TO: 0, 
        TH: 0,
        H1: 0,
        H2: 0,
        H3: 0,
        HR: item.homeruns,
        CA: item.carreras_anotadas,
        CI: 0,
        BR: 0,
        K: 0,
        BB: 0,
        BG: 0,
        JB: 0,
        AVE: item.promedio_bateo,
      })));
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error al cargar estadísticas:", err);
      setLoading(false);
    });
}, [jugadorId, divisionId, equipoId]);

  return { stats, loading };
}

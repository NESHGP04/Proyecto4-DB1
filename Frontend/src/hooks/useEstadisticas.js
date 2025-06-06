import { useState, useEffect } from "react";

export function useEstadisticas(jugadorId, divisionId, equipoId) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jugadorId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/estadisticas_jugador/${jugadorId}`);
        if (!res.ok) throw new Error("Error al obtener estadísticas");

        const todas = await res.json();

        // Filtrar por jugador, división y equipo si están disponibles
        const filtradas = todas.filter((row) =>
          row.jugador_id === parseInt(jugadorId) &&
          (!divisionId || row.jugadores.division_id === parseInt(divisionId)) &&
          (!equipoId || row.jugadores.equipo_id === parseInt(equipoId))
        );

        setStats(filtradas);
      } catch (error) {
        console.error("Error al obtener estadísticas", error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jugadorId, divisionId, equipoId]);

  return { stats, loading };
}

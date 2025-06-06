import { useEffect, useState } from 'react';

export function usePartidos({ divisionId }) {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!divisionId) return;

    const fetchPartidos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/partidos?divisionId=${divisionId}`);
        if (!response.ok) throw new Error('Error al obtener los partidos');
        
        const data = await response.json();

        const filtrados = data.filter((partido) => {
          const divisionLocal = partido.equipos_partidos_equipo_local_idToequipos?.division_id;
          const divisionVisitante = partido.equipos_partidos_equipo_visitante_idToequipos?.division_id;
          return divisionLocal === divisionId || divisionVisitante === divisionId;
        });

        console.log('Partidos recibidos del backend:', data);
        
        setPartidos(filtrados);
      } catch (error) {
        console.error('Error al obtener los partidos:', error);
        setPartidos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, [divisionId]);

  return { partidos, loading };
}

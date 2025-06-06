import { useEffect, useState } from "react";

export function useJugador(id) {
  const [jugador, setJugador] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`http://localhost:3001/api/jugadores/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener jugador");
        return res.json();
      })
      .then((data) => setJugador(data))
      .catch(() => setJugador(null))
      .finally(() => setLoading(false));
  }, [id]);

  return { jugador, loading };
}

// src/hooks/usePosiciones.js
import { useEffect, useState } from "react";

export const usePosiciones = () => {
  const [posiciones, setPosiciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosiciones = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/posiciones");
        const data = await res.json();
        setPosiciones(data);
      } catch (err) {
        console.error("Error al obtener posiciones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosiciones();
  }, []);

  return { posiciones, loading };
};

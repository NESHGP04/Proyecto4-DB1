import { useEffect, useState } from "react";

export function useDivisiones() {
  const [divisiones, setDivisiones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/division")
      .then((res) => res.json())
      .then((data) => {
        setDivisiones(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar divisiones:", err);
        setLoading(false);
      });
  }, []);

  return { divisiones, loading };
}

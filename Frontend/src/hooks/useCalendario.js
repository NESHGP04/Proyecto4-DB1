import { useEffect, useState } from "react";

export function useCalendario() {
  const [calendario, setCalendario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/calendario") // asegúrate de que la ruta sea correcta
      .then((res) => res.json())
      .then((data) => {
        const juegos = data.map((j) => ({
          fecha: j.fecha.split("T")[0], // solo yyyy-mm-dd
          equipo: j.descripcion || "Sin descripción",
          division: j.temporadas?.division || "Sin división",
        }));
        setCalendario(juegos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar calendario:", err);
        setLoading(false);
      });
  }, []);

  return { calendario, loading };
}
export function useCalendarioPorDivision(divisionId) {
  const [calendario, setCalendario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!divisionId) {
      setCalendario([]);
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3001/api/calendario?division=${divisionId}`) // Asegúrate de que la ruta sea correcta
      .then((res) => res.json())
      .then((data) => {
        const juegos = data.map((j) => ({
          fecha: j.fecha.split("T")[0], // solo yyyy-mm-dd
          equipo: j.descripcion || "Sin descripción",
          division: j.temporadas?.division || "Sin división",
        }));
        setCalendario(juegos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar calendario por división:", err);
        setLoading(false);
      });
  }, [divisionId]);

  return { calendario, loading };
}
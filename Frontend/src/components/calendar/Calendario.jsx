import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "@styles/Calendar.css";

function Calendario() {
  const [value, setValue] = useState(new Date());
  const [partidos, setPartidos] = useState([]);
  const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/partidos")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setPartidos(Array.isArray(data) ? data : []))
      .catch(() => setPartidos([]));
  }, []);

  const handleDateChange = (date) => {
    setValue(date);
    const fechaStr = date.toISOString().split("T")[0];
    setJuegosSeleccionados(
      partidos.filter(
        (j) => new Date(j.fecha_hora).toISOString().split("T")[0] === fechaStr
      )
    );
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month" || !Array.isArray(partidos)) return null;
    const fechaStr = date.toISOString().split("T")[0];
    const juegosDelDia = partidos.filter(
      (j) => new Date(j.fecha_hora).toISOString().split("T")[0] === fechaStr
    );
    return juegosDelDia.length > 0 ? (
      <div className="juego-dia">
        {juegosDelDia.map((_, i) => (
          <span key={i} className="iconito">
            🥎
          </span>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="calendario-prueba">
      <Calendar
        onChange={handleDateChange}
        value={value}
        className="custom-calendar"
        tileContent={tileContent}
        formatMonthYear={(locale, date) =>
          // solo mes y año, sin "de"
          `${date.toLocaleString(locale, {
            month: "long",
          })} ${date.getFullYear()}`
        }
      />

      {juegosSeleccionados.length > 0 && (
        <div className="detalle-juego">
          <h3>Juegos programados:</h3>
          {juegosSeleccionados.map((juego, idx) => (
            <div key={idx}>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(juego.fecha_hora).toLocaleString()}
              </p>
              <p>
                <strong>Partido:</strong>{" "}
                {juego.equipos_partidos_equipo_local_idToequipos?.nombre} vs{" "}
                {juego.equipos_partidos_equipo_visitante_idToequipos?.nombre}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendario;

import { useState, useEffect } from 'react';
import { useTemporada } from '@context/TemporadaContext';
import '@styles/Stats.css'

function Header(){
    const { temporadaSeleccionada, setTemporadaSeleccionada } = useTemporada();
    const [temporadas, setTemporadas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/temporadas")
        .then((res) => res.json())
        .then((data) => {
            setTemporadas(data);
            if (data.length > 0 && !temporadaSeleccionada) {
            setTemporadaSeleccionada(data[0]);
            }
        });
    }, []);

    const handleChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const temporada = temporadas.find((t) => t.id === selectedId);
        if (temporada) {
        setTemporadaSeleccionada(temporada);
        }
    };

    return (
    <>
      <div className="header-container">
        <h1 className="header">
          Estadísticas {temporadaSeleccionada?.nombre || ""}
        </h1>
        <select
          value={temporadaSeleccionada?.id || ""}
          onChange={handleChange}
          className="year-selector"
        >
          {temporadas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="dates-container">
        <label>Inicio: {temporadaSeleccionada?.fecha_inicio?.slice(0, 10)}</label>
        <label>Fin: {temporadaSeleccionada?.fecha_fin?.slice(0, 10)}</label>
      </div>
    </>
  );
}

export default Header
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDivision } from "@/context/DivisionContext"; 

export default function TableAllDiv({ selectedTeam }) {
  const navigate = useNavigate();
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);

  const { division } = useDivision();

    const handlePlayerClick = (id) => {
      navigate(`/player/${id}`);
    };

  useEffect(() => {
    if (!selectedTeam || !division) return;
    setLoading(true);
    const url = `http://localhost:3001/api/jugadores/filtrar?equipo=${selectedTeam}&division=${division}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setJugadores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener jugadores:", err);
        setLoading(false);
      });
  }, [selectedTeam, division]);


  return (
    <div className="employee-info-container">
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Fecha Nacimiento</th>
            <th>Género</th>
            <th>Nacionalidad</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador) => (
            <tr key={jugador.id}>
              <td
                className="clickable-player"
                onClick={() => handlePlayerClick(jugador.id)}
                style={{ cursor: "pointer" }}
              >
                {jugador.nombre} {jugador.apellido}
              </td>
              <td>{new Date(jugador.fecha_nacimiento).toLocaleDateString()}</td>
              <td>{jugador.genero}</td>
              <td>{jugador.nacionalidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

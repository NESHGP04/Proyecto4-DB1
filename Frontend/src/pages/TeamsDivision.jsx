import { useParams } from "react-router-dom";
import { useTeam } from "@/context/TeamContext";
import { useTemporada } from "@/context/TemporadaContext";
import { useEffect, useState } from "react";
import Navbar from "@components/navigation/Navbar";
import AveSquare from "@components/divisiones/allDivisions/AveSquare";
import TableAllDiv from "@components/divisiones/allDivisions/TableAllDiv";
import "@styles/Divisiones.css";

function TeamsDivision() {
  const { division } = useParams();
  const { team, setTeam } = useTeam();
  const { temporadaSeleccionada } = useTemporada();
  const [equipos, setEquipos] = useState([]);

  // Ejemplo de mapeo de nombre a id (ajusta según tus divisiones reales)
  const divisionNameToId = {
    Norte: 1,
    Sur: 2,
    Este: 3,
    Oeste: 4,
  };

  useEffect(() => {
    if (!division) return;
    // Si division es nombre, conviértelo a id
    const divisionId = isNaN(Number(division))
      ? divisionNameToId[division]
      : division;
    if (!divisionId) return;
    fetch(`http://localhost:3001/api/equipos/division/${divisionId}`)
      .then((response) => response.json())
      .then((data) => {
        setEquipos(data);
        setTeam(""); // Limpia el equipo seleccionado al cambiar de división
      })
      .catch((error) => {
        console.error("Error al obtener equipos:", error);
      });
  }, [division, setTeam]);

  return (
    <div>
      <Navbar />
      <h1 className="header">{division}</h1>
      <p className="date">
        {temporadaSeleccionada ? `${temporadaSeleccionada.nombre}` : ""}
      </p>

      <select
        className="alldiv-selector"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      >
        <option value="">Selecciona un equipo</option>
        {equipos.map((equipo) => (
          <option key={equipo.id} value={equipo.id}>
            {equipo.nombre}
          </option>
        ))}
      </select>

      <TableAllDiv selectedTeam={team} />
    </div>
  );
}

export default TeamsDivision;

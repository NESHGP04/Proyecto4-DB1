import { useParams } from "react-router-dom";
import { useTeam } from '@/context/TeamContext';
import { useEffect, useState } from "react";
import Navbar from '@components/navigation/Navbar'
import AveSquare from '@components/divisiones/allDivisions/AveSquare'
import TableAllDiv from '@components/divisiones/allDivisions/TableAllDiv'
import '@styles/Divisiones.css';

function TeamsDivision() {
  const { division, year } = useParams();
  const { team, setTeam } = useTeam();
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/equipos')
      .then(response => response.json())
      .then(data => {
        console.log("Equipos recibidos:", data);
        setEquipos(data);
      })
      .catch(error => {
        console.error("Error al obtener equipos:", error);
      });
  }, []);


  return (
    <div>
      <Navbar />
      <h1 className="header">{division}</h1>
      <p className="date">{year}</p>

      <select
        className="alldiv-selector"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      >
        <option value="">Selecciona un equipo</option>
        {equipos.map((equipo) => (
          <option key={equipo.id} value={equipo.nombre}>
            {equipo.nombre}
          </option>
        ))}
      </select>
      
      <AveSquare />

      <TableAllDiv selectedTeam={team}/>
    </div>
  );
}

export default TeamsDivision

import { useParams } from "react-router-dom";
import { useTeam } from '@/context/TeamContext';
import Navbar from '@components/navigation/Navbar'
import AveSquare from '@components/divisiones/allDivisions/AveSquare'
import TableAllDiv from '@components/divisiones/allDivisions/TableAllDiv'
import '@styles/Divisiones.css';

const equipos = ['AA', 'BB', 'CC', 'DD']

function TeamsDivision() {
  const { division, year } = useParams();
  const { team, setTeam } = useTeam();

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
        {equipos.map((div) => (
          <option key={div} value={div}>
            {div}
          </option>
        ))}
      </select>

      <AveSquare />

      <TableAllDiv selectedTeam={team}/>
    </div>
  );
}

export default TeamsDivision

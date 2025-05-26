import { useParams } from "react-router-dom";

function TeamsDivision() {
  const { division, year } = useParams();

  return (
    <div>
      <h1>{division}</h1>
      <p>Año: {year}</p>
    </div>
  );
}

export default TeamsDivision

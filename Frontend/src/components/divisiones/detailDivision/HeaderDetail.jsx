import { useParams } from "react-router-dom";
import { useDivision } from "@/context/DivisionContext";
import { useTeam } from "@/context/TeamContext";
import { useEstadisticas } from "@/hooks/useEstadisticas";
import { useJugador } from "@/hooks/useJugador";
import EditButton from "./EditButton";

function HeaderDetail() {
  const { id: jugadorId } = useParams();
  const { division: divisionId } = useDivision();
  const { team: equipoId } = useTeam();

  const { stats, loading: loadingStats } = useEstadisticas(jugadorId, divisionId, equipoId);
  const { jugador, loading: loadingJugador } = useJugador(jugadorId);

  if (loadingStats || loadingJugador) return <p>Cargando estadísticas...</p>;
  if (!stats.length) return <p>No se encontraron estadísticas para este jugador.</p>;
  if (!jugador) return <p>Jugador no encontrado.</p>;

  const promedioAVE = (
    stats.reduce((acc, curr) => acc + curr.AVE, 0) / stats.length
  ).toFixed(3);

  return (
    <div className="header-detail-container"> 
      <h1 className="header-detail">{jugador.nombre} {jugador.apellido}</h1>

      <EditButton />

      <div className="averageDetail-box">
        <div className="averageDetail-value">
          {promedioAVE}
        </div>
        <div className="averageDetail-label">
          average
        </div>
      </div>
    </div>
  );
}

export default HeaderDetail;

import { useParams } from "react-router-dom";
import { useDivision } from '@/context/DivisionContext';
import { useTeam } from '@/context/TeamContext';
import { useEstadisticas } from '@/hooks/useEstadisticas';
import EditButton from "./EditButton";

// const rows = [
//   { id: 1, nombre: "Juan", equipo: "AA", AB: 10, TO: 3, TH: 7, H1: 2, H2: 2, H3: 1, HR: 2, CA: 5, CI: 3, BR: 1, K: 2, BB: 1, BG: 1, JB: 1, AVE: 0.70 },
//   { id: 2, nombre: "Pepe", equipo: "BB", AB: 15, TO: 5, TH: 10, H1: 4, H2: 2, H3: 2, HR: 2, CA: 4, CI: 2, BR: 0, K: 3, BB: 1, BG: 2, JB: 0, AVE: 0.66 },
//   { id: 3, nombre: "José", equipo: "CC", AB: 20, TO: 4, TH: 16, H1: 6, H2: 5, H3: 3, HR: 2, CA: 6, CI: 5, BR: 2, K: 1, BB: 2, BG: 3, JB: 2, AVE: 0.8 }
// ];

function HeaderDetail(){
    const { id: jugadorId } = useParams();
    const { division: divisionId } = useDivision();
    const { team: equipoId } = useTeam();

    const { stats, loading } = useEstadisticas(jugadorId, divisionId, equipoId);
    if (loading) return <p>Cargando estadísticas...</p>;
    if (!stats.length) return <p>No se encontraron estadísticas para este jugador.</p>;

     // Suponiendo que el nombre viene en los datos del jugador
    const nombreJugador = stats[0].nombre || 'Sin nombre';
    const promedioAVE = (
        stats.reduce((acc, curr) => acc + curr.AVE, 0) / stats.length
    ).toFixed(3);

    const player = rows.find((row) => row.id === parseInt(id));    
    if (!player) return <p>Jugador no encontrado</p>;

    return(
        <div className="header-detail-container"> 
            <h1 className="header-detail">{nombreJugador}</h1>

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

export default HeaderDetail
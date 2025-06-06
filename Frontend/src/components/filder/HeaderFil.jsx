import { useTemporada } from '@context/TemporadaContext';
import { useDivision } from '@context/DivisionContext';
import { usePosition } from '@/context/PositionContext';
import { useDivisiones } from '@/hooks/useDivisiones'; // Hook a divisiones
import { usePosiciones } from "@/hooks/usePosiciones";

function HeaderPos(){
    const { temporadaSeleccionada } = useTemporada();
    const { division, setDivision } = useDivision();
    const { position, setPosition } = usePosition();
    const { divisiones, loading } = useDivisiones();
    const { posiciones, loading: loadingPosiciones } = usePosiciones();

    return(
        <>
        <div className="header-container">
             <h1 className="headerpos">Filders</h1>
        </div>

        <p className="year">
          {temporadaSeleccionada ? `- ${temporadaSeleccionada.nombre}` : ""}
        </p>

        <div className='selectors-container'> 
            {loading ? (
            <p>Cargando divisiones...</p>
            ) : (
            <select
                className="division-selector"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
            >
                <option value="">Selecciona una división</option>
                {divisiones.map((div) => (
                <option key={div.id} value={div.id}>
                    {div.nombre}
                </option>
                ))}
            </select>
            )}

            {loadingPosiciones ? (
            <p>Cargando posiciones...</p>
            ) : (
            <select
                className="division-selector"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            >
                <option value="">Selecciona una posición</option>
                {posiciones.map((pos) => (
                <option key={pos.id} value={pos.nombre}>
                    {pos.nombre}
                </option>
                ))}
            </select>
            )}
        </div>
        </>
    );
}

export default HeaderPos
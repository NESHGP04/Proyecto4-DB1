import { useTemporada } from '@context/TemporadaContext';
import { useDivision } from '@context/DivisionContext';
import { useDivisiones } from '@/hooks/useDivisiones'; // Hook a divisiones

function HeaderPos(){
    const { temporadaSeleccionada } = useTemporada();
    const { division, setDivision } = useDivision();
    const { divisiones, loading } = useDivisiones();

    return(
        <>
        <div className="header-container">
             <h1 className="headerpos">Picheo</h1>
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
        </div>
        </>
    );
}

export default HeaderPos
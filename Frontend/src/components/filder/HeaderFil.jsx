import { useYear } from '@/context/YearContext';
import { useDivision } from '@context/DivisionContext';
import { usePosition } from '@/context/PositionContext';
import { useDivisiones } from '@/hooks/useDivisiones'; // Hook a divisiones

const positionsDisponibles = ['Catcher', '1B', '2B', 'SS', '3B', 'RF', 'CF', 'LF']

function HeaderPos(){
    const { year } = useYear(); // accede al año compartido
    const { division, setDivision } = useDivision();
    const { position, setPosition } = usePosition();
    const { divisiones, loading } = useDivisiones();

    return(
        <>
        <div className="header-container">
             <h1 className="headerpos">Filders</h1>
        </div>

        <p className="year">{year}</p>

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

            <select
                    className="division-selector"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                >
                    {positionsDisponibles.map((div) => (
                        <option key={div} value={div}>
                            {div}
                        </option>
                    ))}
            </select>
        </div>
        </>
    );
}

export default HeaderPos
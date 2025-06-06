import { useDivision } from '@context/DivisionContext';
import { useDivisiones } from '@/hooks/useDivisiones'; // Hook a divisiones

function HeaderCal(){
    const { division, setDivision } = useDivision();
    const { divisiones, loading } = useDivisiones();

    return(
        <>
        <div className="header-container">
             <h1 className="headerpos">Calendario</h1>
        </div>

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

export default HeaderCal
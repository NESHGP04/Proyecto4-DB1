import { useYear } from '@/context/YearContext';
import { useDivision } from '@context/DivisionContext';

//Traer de DB
const divisionesDisponibles = ['Norte', 'Sur', 'Este', 'Oeste'];

function HeaderPos(){
    const { year } = useYear(); // accede al año compartido
    const { division, setDivision } = useDivision();
    // const [division, setDivision] = useState('Norte');

    return(
        <>
        <div className="header-container">
             <h1 className="headerpos">Tabla de Posiciones</h1>
        </div>

        <p className="year">{year}</p>

        <div className='selectors-container'>
            <select
                className="division-selector"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
            >
                {divisionesDisponibles.map((div) => (
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
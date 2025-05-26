import { useYear } from '@/context/YearContext';
import { useDivision } from '@context/DivisionContext';
import { usePosition } from '@/context/PositionContext';

//Traer de DB
const divisionesDisponibles = ['Norte', 'Sur', 'Este', 'Oeste'];
const positionsDisponibles = ['Catcher', '1B', '2B', 'SS', '3B', 'RF', 'CF', 'LF']

function HeaderPos(){
    const { year } = useYear(); // accede al año compartido
    const { division, setDivision } = useDivision();
    const { position, setPosition } = usePosition();

    return(
        <>
        <div className="header-container">
             <h1 className="headerpos">Filders</h1>
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
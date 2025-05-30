import { useDivision } from '@context/DivisionContext';

//Traer de DB
const divisionesDisponibles = ['Norte', 'Sur', 'Este', 'Oeste'];

function HeaderCal(){
    const { division, setDivision } = useDivision();

    return(
        <>
        <div className="header-container">
             <h1 className="headerpos">Calendario</h1>
        </div>

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

export default HeaderCal
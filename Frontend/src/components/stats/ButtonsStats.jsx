import { useNavigate } from "react-router-dom";
import '@styles/Stats.css'
import trophy from '@assets/trophy.png'
import sport from '@assets/sport.png'
import bat from '@assets/baseball-bat.png'
import ball from '@assets/baseball-ball.png'

function ButtonsStats(){
    const navigate = useNavigate();

    return(
        <div className='buttons-container'>
            <button onClick={() => navigate("/positions")}>
                Tabla de Posiciones
                <img src={trophy} alt="trophy" className='icon' />
                </button>
            <button onClick={() => navigate("/bat-stat")}>
                Bateo
                <img src={bat} alt="bat" className='icon' />
            </button>
            <button onClick={() => navigate("/pitcher-stat")}>
                Picheo
                <img src={ball} alt="ball" className='icon' />
            </button>
            <button onClick={() => navigate("/filder-stat")}>
                Fildeo
                <img src={sport} alt="glove" className='icon' />
            </button>
        </div>
    );
}

export default ButtonsStats;
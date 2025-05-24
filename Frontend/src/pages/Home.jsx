import '@styles/Home.css'
import { Navigate, useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    
    return(
        <div className='background'>
            <div className='overlay-box'>
                <h1>SoftStats</h1>
                
                <button onClick={() => navigate("/stats")} className="button-home">Estadísticas</button>
            </div>

        </div>
    );
}

export default Home;
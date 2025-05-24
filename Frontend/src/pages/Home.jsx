import '@styles/Home.css'

function Home(){
    return(
        <div className='background'>
            <div className='overlay-box'>
                <h1>SoftStats</h1>
                
                <button onClick={() => navigate("/all-clinics")} className="button-home">Estadísticas</button>
            </div>

        </div>
    );
}

export default Home;
import Navbar from "@components/navigation/Navbar";
import Header from "@components/stats/Header";
import ButtonsStats from "../components/stats/ButtonsStats";

function Stats(){
    return(
        <>
        {/* Barra de navegación superior */}
        <Navbar /> 

        <Header />

        <ButtonsStats />
        </>
    );
}

export default Stats
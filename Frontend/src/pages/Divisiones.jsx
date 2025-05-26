import Navbar from "@components/navigation/Navbar";
import HeaderDiv from "@components/divisiones/HeaderDiv";
import TableDiv from "@components/divisiones/TableDiv"

function Stats(){
    return(
        <>
        {/* Barra de navegación superior */}
        <Navbar /> 

        <HeaderDiv />

        <TableDiv />

        </>
    );
}

export default Stats
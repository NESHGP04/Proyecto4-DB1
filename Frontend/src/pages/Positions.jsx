import '@styles/Positions.css'
import Navbar from "@components/navigation/Navbar";
import HeaderPos from '../components/positions/HeaderPos';
import TablePos from '../components/positions/TablePos';

function Positions(){
    return(
        <>
            <Navbar />
            
            <HeaderPos />

            <TablePos />
        </>
    );
}

export default Positions
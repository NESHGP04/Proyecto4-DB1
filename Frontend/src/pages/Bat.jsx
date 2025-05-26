import '@styles/Positions.css'
import Navbar from "@components/navigation/Navbar";
import HeaderBat from '@components/bat/HeaderBat';
import TableBat from '@components/bat/TableBat';

function Positions(){
    return(
        <>
            <Navbar />
            
            <HeaderBat />

            <TableBat />
        </>
    );
}

export default Positions
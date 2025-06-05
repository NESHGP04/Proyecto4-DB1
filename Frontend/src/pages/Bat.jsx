import '@styles/Positions.css'
import Navbar from "@components/navigation/Navbar";
import HeaderBat from '@components/bat/HeaderBat';
import TableBat from '@components/bat/TableBat';
import ResportBat from '@components/bat/ReportBat';

function Positions(){
    return(
        <>
            <Navbar />
            
            <HeaderBat />

            <TableBat />

            <ResportBat />
        </>
    );
}

export default Positions
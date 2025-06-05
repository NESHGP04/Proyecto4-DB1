import '@styles/Positions.css'
import Navbar from "@components/navigation/Navbar";
import HeaderPic from '@components/picheo/HeaderPic';
import TablePic from '@components/picheo/TablePic';
import ResportPic from '@components/picheo/ReportPic';

function Positions(){
    return(
        <>
            <Navbar />
            
            <HeaderPic />

            <TablePic />

            <ResportPic />
        </>
    );
}

export default Positions
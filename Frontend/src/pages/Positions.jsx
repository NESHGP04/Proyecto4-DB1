import '@styles/Positions.css'
import Navbar from "@components/navigation/Navbar";
import HeaderPos from '../components/positions/HeaderPos';
import TablePos from '../components/positions/TablePos';
import ReportPos from '@components/positions/ReportPos'

function Positions(){
    return(
        <>
            <Navbar />
            
            <HeaderPos />

            <TablePos />

            <ReportPos />
        </>
    );
}

export default Positions
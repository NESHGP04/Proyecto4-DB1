import Navbar from '@components/navigation/Navbar'
import HeaderDetail from '@components/divisiones/detailDivision/HeaderDetail';
import '@styles/DetailPlayer.css';
import TableDetail from '@components/divisiones/detailDivision/TableDetail';

function DetailPlayer(){

    return(
        <>
            <Navbar /> 

            <HeaderDetail />

            <TableDetail />
        </>
    );
}

export default DetailPlayer
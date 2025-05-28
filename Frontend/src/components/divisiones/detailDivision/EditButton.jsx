import { FaEdit } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import '@styles/DetailPlayer.css'

function EditButton({ id }){
    const navigate = useNavigate();
    
    return(
        <button onClick={() => navigate(`/player/${id}/edit`)} className='button-edit'>
            <FaEdit />
        </button>

    );
}

export default EditButton;
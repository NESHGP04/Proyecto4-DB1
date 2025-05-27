import { FaEdit } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function EditButton(){
    const navigate = useNavigate();
    
    return(
        <button className="button-edit" onClick={() => navigate("/edit")}>
                  <FaEdit />
        </button>
    );
}

export default EditButton;
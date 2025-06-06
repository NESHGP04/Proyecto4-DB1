import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useYear } from '@/context/YearContext';

function TableDiv() {
    const navigate = useNavigate();
    const { year } = useYear(); // accede al año compartido
    const [divisiones, setDivisiones] = useState([]);

    //Llama API
    useEffect(() => {
      // Cambia la URL a la que usas para obtener divisiones
      fetch("http://localhost:3001/api/division")
        .then((res) => res.json())
        .then((data) => setDivisiones(data))
        .catch((error) => console.error("Error al cargar divisiones:", error));
    }, []);

    //Filtra por año
     const goToDivision = (division) => {
        if (!year) {
        alert("Por favor selecciona un año antes de ver la división.");
        return;
        }
        navigate(`/teams-division/${division}/${year}`);
    };

  return (
    <div className="table-container">
      <table className="position-table">
        <thead>
          <tr>
            <th>Divisiones</th>
          </tr>
        </thead>
        <tbody>
          {divisiones.map((division) => (
            <tr
              key={division.id}
              style={{ cursor: "pointer" }}
              onClick={() => goToDivision(division.nombre)}
            >
              <td>{division.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDiv;

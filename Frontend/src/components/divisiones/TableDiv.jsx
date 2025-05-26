import { Navigate, useNavigate } from "react-router-dom";
import { useYear } from '@/context/YearContext';

function TableDiv() {
    const navigate = useNavigate();
    const { year } = useYear(); // accede al año compartido

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
            <th>Masculina</th>
            <th>Femenina</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td onClick={() => goToDivision("Mayor A Masculina")}>Mayor A</td>
            <td onClick={() => goToDivision("Mayor A Femenina")}>Mayor A</td>
          </tr>
          <tr>
            <td onClick={() => goToDivision("Mayor B Masculina")}>Mayor B</td>
            <td onClick={() => goToDivision("Mayor B Femenina")}>Mayor B</td>
          </tr>
          <tr>
            <td onClick={() => goToDivision("Especial Masculina")}>Especial</td>
            <td onClick={() => goToDivision("Especial Femenina")}>Especial</td>
          </tr>
          <tr>
            <td onClick={() => goToDivision("1ra Division Masculina")}>1ra División</td>
            <td></td>
          </tr>
          <tr>
            <td onClick={() => goToDivision("2da Division Masculina")}>2da División</td>
            <td></td>
          </tr>
          <tr>
            <td onClick={() => goToDivision("3ra Division Masculina")}>3ra División</td>
            <td></td>
          </tr>
          <tr>
            <td onClick={() => goToDivision("4ta Division Masculina")}>4ta División</td>
            <td></td>
          </tr>

          {/* Categorías mixtas */}
          <tr>
            <td
              colSpan={2}
              style={{ textAlign: "center", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => goToDivision("BolaLentaA")}
            >
              Bola Lenta A
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{ textAlign: "center", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => goToDivision("BolaLentaB")}
            >
              Bola Lenta B
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{ textAlign: "center", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => goToDivision("BolaLentaC")}
            >
              Bola Lenta C
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableDiv;

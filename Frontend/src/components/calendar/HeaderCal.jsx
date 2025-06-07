import { useDivision } from "@context/DivisionContext";
import { useDivisiones } from "@/hooks/useDivisiones"; // Hook a divisiones

function HeaderCal() {
  const { division, setDivision } = useDivision();
  const { divisiones, loading } = useDivisiones();

  return (
    <>
      <div className="header-container">
        <h1 className="headerpos">Calendario</h1>
      </div>
    </>
  );
}

export default HeaderCal;

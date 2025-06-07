import { useTemporada } from "@context/TemporadaContext";
import { useDivision } from "@context/DivisionContext"; //context a divisiones
import { useDivisiones } from "@/hooks/useDivisiones"; // Hook a divisiones

function HeaderPos() {
  const { temporadaSeleccionada } = useTemporada();
  const { division, setDivision } = useDivision();
  const { divisiones, loading } = useDivisiones();

  return (
    <>
      <div className="header-container">
        <h1 className="headerpos">Bateo</h1>
      </div>

      <p className="year" style={{ marginBottom: "2rem" }}>
        {temporadaSeleccionada ? `- ${temporadaSeleccionada.nombre}` : ""}
      </p>

      <div></div>
      <div></div>
    </>
  );
}

export default HeaderPos;

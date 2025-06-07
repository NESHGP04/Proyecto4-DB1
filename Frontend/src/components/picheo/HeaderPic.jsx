import { useTemporada } from "@context/TemporadaContext";
import { useDivision } from "@context/DivisionContext";
import { useDivisiones } from "@/hooks/useDivisiones";

function HeaderPos() {
  const { temporadaSeleccionada } = useTemporada();
  const { division, setDivision } = useDivision();
  const { divisiones, loading } = useDivisiones();

  return (
    <>
      <div className="header-container">
        <h1 className="headerpos">Picheo</h1>
      </div>

      <p className="year" style={{ marginBottom: "2rem" }}>
        {temporadaSeleccionada ? `- ${temporadaSeleccionada.nombre}` : ""}
      </p>
    </>
  );
}

export default HeaderPos;

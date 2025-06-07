import { useTemporada } from "@context/TemporadaContext";
import { useDivision } from "@context/DivisionContext";
import { usePosition } from "@/context/PositionContext";
import { useDivisiones } from "@/hooks/useDivisiones"; // Hook a divisiones
import { usePosiciones } from "@/hooks/usePosiciones";

function HeaderPos() {
  const { temporadaSeleccionada } = useTemporada();
  const { division, setDivision } = useDivision();
  const { position, setPosition } = usePosition();
  const { divisiones, loading } = useDivisiones();
  const { posiciones, loading: loadingPosiciones } = usePosiciones();

  return (
    <>
      <div className="header-container">
        <h1 className="headerpos">Filders</h1>
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

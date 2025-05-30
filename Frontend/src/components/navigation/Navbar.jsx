import { useNavigate, useLocation } from "react-router-dom";
import "@styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Aquí obtenemos la ruta actual

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div 
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`} 
          onClick={() => navigate("/")}
        >
          Estadísticas
        </div>

        <div 
          className={`nav-item ${location.pathname === "/divisions" ? "active" : ""}`} 
          onClick={() => navigate("/divisions")}
        >
          Divisiones
        </div>

        <div 
          className={`nav-item ${location.pathname === "/calendar" ? "active" : ""}`} 
          onClick={() => navigate("/calendar")}
        >
          Calendario
        </div>

        <div 
          className={`nav-item ${location.pathname === "/inscription" ? "active" : ""}`} 
          onClick={() => navigate("/inscription")}
        >
          Inscripción
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

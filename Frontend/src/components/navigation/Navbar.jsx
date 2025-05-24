import { useNavigate } from "react-router-dom";
import "@styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="nav-item" onClick={() => navigate("/")}>Estadísticas</div>
        <div className="nav-item" onClick={() => navigate("/divisions")}>Divisiones</div>
        <div className="nav-item" onClick={() => navigate("/calendar")}>Calendario</div>
        <div className="nav-item" onClick={() => navigate("/inscription")}>Inscripción</div>
      </nav>
    </header>
  );
};

export default Navbar;
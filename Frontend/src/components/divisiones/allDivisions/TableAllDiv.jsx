import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDivision } from "@/context/DivisionContext";
import "@styles/TableAllDiv.css";

export default function TableAllDiv({ selectedTeam }) {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [editJugador, setEditJugador] = useState(null);

  const { division } = useDivision();

  const handlePlayerClick = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/estadisticas_jugador/${id}`
      );
      if (!res.ok) throw new Error("No se pudieron obtener las estadísticas");
      const statsData = await res.json();
      setStats(statsData);
      setEditJugador({
        nombre: statsData.nombre || "",
        apellido: statsData.apellido || "",
        equipo_id: statsData.equipo_id || "",
      });
    } catch (error) {
      alert("Error al obtener estadísticas del jugador");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedTeam) return;
    setLoading(true);
    setStats(null);
    setEditJugador(null);
    const url = `http://localhost:3001/api/jugadores/equipo/${selectedTeam}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setJugadores(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setJugadores([]);
        console.error("Error al obtener jugadores:", err);
      });
  }, [selectedTeam]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditJugador((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!stats?.id) return;
    try {
      const res = await fetch(
        `http://localhost:3001/api/jugadores/${stats.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editJugador),
        }
      );
      if (!res.ok) throw new Error("No se pudo actualizar el jugador");
      alert("Jugador actualizado correctamente");
      setStats((prev) => ({ ...prev, ...editJugador }));
    } catch (error) {
      alert("Error al actualizar el jugador");
      console.error(error);
    }
  };

  if (loading) return <div>Cargando jugadores...</div>;
  if (!jugadores.length) return <div>No hay jugadores para este equipo.</div>;

  return (
    <div className="employee-info-container">
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Fecha Nacimiento</th>
            <th>Género</th>
            <th>Nacionalidad</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador) => (
            <tr key={jugador.id}>
              <td
                className="clickable-player"
                onClick={() => handlePlayerClick(jugador.id)}
                style={{ cursor: "pointer" }}
              >
                {jugador.nombre} {jugador.apellido}
              </td>
              <td>
                {jugador.fecha_nacimiento
                  ? new Date(jugador.fecha_nacimiento).toLocaleDateString()
                  : "—"}
              </td>
              <td>{jugador.genero}</td>
              <td>{jugador.nacionalidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {stats && (
        <div
          className="player-stats"
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#f9f9f9",
            maxWidth: "600px",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>
            Estadísticas del jugador
          </h3>
          <table className="stats-table">
            <tbody>
              {Object.entries(stats)
                .filter(
                  ([, value]) => typeof value !== "object" || value === null
                )
                .map(([key, value]) => (
                  <tr key={key}>
                    <td>{key.replace(/_/g, " ")}</td>
                    <td>
                      {typeof value === "number"
                        ? value.toLocaleString()
                        : value}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {editJugador && (
            <>
              <h4 style={{ marginTop: "2rem" }}>Editar datos del jugador</h4>
              <form
                onSubmit={handleEditSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  maxWidth: "400px",
                  marginTop: "1rem",
                }}
              >
                <input
                  type="text"
                  name="nombre"
                  value={editJugador.nombre}
                  onChange={handleEditChange}
                  placeholder="Nombre"
                  required
                />
                <input
                  type="text"
                  name="apellido"
                  value={editJugador.apellido}
                  onChange={handleEditChange}
                  placeholder="Apellido"
                  required
                />
                <input
                  type="number"
                  name="equipo_id"
                  value={editJugador.equipo_id}
                  onChange={handleEditChange}
                  placeholder="ID del equipo"
                  required
                />
                <button type="submit">Guardar cambios</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const divisiones = ["Norte", "Sur", "Este", "Oeste"];

const FormsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    estatura: "",
    peso: "",
    num_cel: "",
    email: "",
    division: "",
    equipo: "",
    camisa: "",
  });

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        const response = await fetch(`http://localhost:3001/jugadores/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener el jugador");
        const jugador = await response.json();
        setFormData(jugador);
      } catch (error) {
        console.error("Error al obtener datos del jugador:", error);
        alert("No se pudo cargar la información del jugador.");
      }
    };

    fetchJugador();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/jugadores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Jugador actualizado con éxito");
        navigate("/players");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar jugador:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  const labels = {
    estatura: "Estatura (cm):",
    peso: "Peso (lb):",
    num_cel: "Número de celular:",
    email: "Correo electrónico:",
    division: "División:",
    equipo: "Equipo:",
    camisa: "Número de camisa:",
  };

  return (
    <div className="overlay-box-agregar">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label-forms">ID:</label>
        <input type="text" value={id} disabled />

        <label className="label-forms">{labels.estatura}</label>
        <input
          type="number"
          name="estatura"
          value={formData.estatura}
          onChange={handleChange}
          required
        />

        <label className="label-forms">{labels.peso}</label>
        <input
          type="number"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
          required
        />

        <label className="label-forms">{labels.num_cel}</label>
        <input
          type="text"
          name="num_cel"
          value={formData.num_cel}
          onChange={handleChange}
          required
        />

        <label className="label-forms">{labels.email}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="label-forms">{labels.division}</label>
        <select
          name="division"
          className="select-action-forms"
          value={formData.division}
          onChange={handleChange}
          required
        >
          <option value="">--Seleccione--</option>
          {divisiones.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label className="label-forms">{labels.equipo}</label>
        <input
          type="text"
          name="equipo"
          value={formData.equipo}
          onChange={handleChange}
          required
        />

        <label className="label-forms">{labels.camisa}</label>
        <input
          type="number"
          name="camisa"
          value={formData.camisa}
          onChange={handleChange}
          required
        />

        <div className="button-register">
          <button type="submit">Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default FormsEdit;

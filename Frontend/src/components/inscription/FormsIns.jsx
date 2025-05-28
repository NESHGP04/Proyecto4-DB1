import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@styles/Edit.css";

const divisiones = ["Norte", "Sur", "Este", "Oeste"];
const equipos = ["AA", "BB", "CC"];

const FormsIns = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: "",
    dpi: "",
    estatura: "",
    peso: "",
    cel: "",
    email: "",
    division: "",
    equipo: "",
    posicion: "",
    camisa: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/jugadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al registrar el jugador.");
        return;
      }

      alert("Jugador registrado con éxito");
      navigate(`/equipos/${formData.equipo}/jugadores`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error de red al registrar el jugador.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {};
    const form = formRef.current;
    if (form) {
      form.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (form) {
        form.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="overlay-box-agregar">
      <form className="form" onSubmit={handleSubmit} ref={formRef}>
        <label className="label-forms">Nombre completo:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label className="label-forms">DPI:</label>
        <input type="text" name="dpi" value={formData.dpi} onChange={handleChange} required />

        <label className="label-forms">Estatura (cm):</label>
        <input type="text" name="estatura" value={formData.estatura} onChange={handleChange} required />

        <label className="label-forms">Peso (lb):</label>
        <input type="text" name="peso" value={formData.peso} onChange={handleChange} required />

        <label className="label-forms">Num. Celular:</label>
        <input type="text" name="cel" value={formData.cel} onChange={handleChange} required />

        <label className="label-forms">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label className="label-forms">División:</label>
        <select name="division" className="select-action-forms" value={formData.division} onChange={handleChange} required>
          <option value="">--Seleccione--</option>
          {divisiones.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label className="label-forms">Equipo:</label>
        <select name="equipo" className="select-action-forms" value={formData.equipo} onChange={handleChange} required>
          <option value="">--Seleccione--</option>
          {equipos.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        <label className="label-forms">Función en equipo:</label>
        <input type="text" name="posicion" value={formData.posicion} onChange={handleChange} required />

        <label className="label-forms">Num. Camisa:</label>
        <input type="text" name="camisa" value={formData.camisa} onChange={handleChange} required />

        <div className="button-register">
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default FormsIns;

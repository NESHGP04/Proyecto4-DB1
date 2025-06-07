import React, { useState, useRef, useEffect } from "react";
import "@styles/Edit.css";

const divisiones = ["Norte", "Sur", "Este", "Oeste"];

const FormsIns = () => {
  const formRef = useRef(null);

  const [equipos, setEquipos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "",
    nacionalidad: "",
    equipo_id: "",
    fecha_ingreso: "",
    division: "",
  });

  // Cargar equipos desde el backend
  useEffect(() => {
    fetch("http://localhost:3001/api/equipos")
      .then((res) => res.json())
      .then((data) => setEquipos(data))
      .catch(() => setEquipos([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/jugadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al registrar el jugador.");
        return;
      }

      alert("Jugador registrado con éxito");
      // Se removió el navigate para que el formulario permanezca visible
      // Puedes opcionalmente limpiar los campos:
      // setFormData({ nombre: "", apellido: "", fecha_nacimiento: "", genero: "", nacionalidad: "", equipo_id: "", fecha_ingreso: "", division: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Error de red al registrar el jugador.");
    }
  };

  return (
    <div className="overlay-box-agregar">
      <form className="form" onSubmit={handleSubmit} ref={formRef}>
        <label className="label-forms">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label className="label-forms">Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />

        <label className="label-forms">Fecha de nacimiento:</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />

        <label className="label-forms">Género:</label>
        <select
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        >
          <option value="">--Seleccione--</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <label className="label-forms">Nacionalidad:</label>
        <input
          type="text"
          name="nacionalidad"
          value={formData.nacionalidad}
          onChange={handleChange}
          required
        />

        <label className="label-forms">División:</label>
        <select
          name="division"
          className="select-action-forms"
          value={formData.division}
          onChange={handleChange}
          required
        >
          <option value="">--Seleccione--</option>
          {divisiones.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <label className="label-forms">Equipo:</label>
        <select
          name="equipo_id"
          className="select-action-forms"
          value={formData.equipo_id}
          onChange={handleChange}
          required
        >
          <option value="">--Seleccione--</option>
          {equipos
            .filter((e) => {
              if (!formData.division) return true;
              if (typeof e.division === "string") {
                return (
                  e.division.toLowerCase() === formData.division.toLowerCase()
                );
              }
              if (typeof e.division === "number") {
                return e.division.toString() === formData.division;
              }
              if (e.division && typeof e.division.nombre === "string") {
                return (
                  e.division.nombre.toLowerCase() ===
                  formData.division.toLowerCase()
                );
              }
              return false;
            })
            .map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
        </select>

        <label className="label-forms">Fecha de ingreso:</label>
        <input
          type="date"
          name="fecha_ingreso"
          value={formData.fecha_ingreso}
          onChange={handleChange}
          required
        />

        <div className="button-register">
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default FormsIns;

import React from "react";

export default function ReportBat({ temporadaId = 1 }) {
  // Crear CSV de bateo
  const generarReporteBateo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cosas_extra/stats/atbat/${temporadaId}`
      );
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        alert("No hay datos de bateo para exportar.");
        return;
      }

      const encabezado = [
        "ID",
        "Nombre",
        "División",
        "Promedio",
        "Ganados",
        "Perdidos",
        "Total",
        "Equipo",
      ];
      const filas = data.map((j) => [
        j.id ?? "",
        j.nombre ?? "",
        j.division ?? "",
        j.average ?? "",
        j.ganados ?? "",
        j.perdidos ?? "",
        j.total ?? "",
        j.equipo ?? "",
      ]);

      const csvContent = [encabezado, ...filas]
        .map((row) => row.map((item) => `"${item}"`).join(","))
        .join("\r\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_bateo.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar reporte de bateo:", error);
      alert("Error al generar el reporte de bateo.");
    }
  };

  return (
    <div className="button-container">
      <div className="button-report">
        <button type="button" onClick={generarReporteBateo}>
          Reporte Bateo
        </button>
      </div>
    </div>
  );
}

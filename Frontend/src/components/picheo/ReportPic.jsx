import React from "react";

export default function ReportPic({ temporadaId = 1 }) {
  const generarReportePitcheo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cosas_extra/stats/pitchers/${temporadaId}`
      );
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        alert("No hay datos de pitcheo para exportar.");
        return;
      }

      const encabezado = [
        "ID",
        "Nombre",
        "División",
        "Innings Lanzados",
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

      // Para navegadores modernos
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_pitcheo.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar reporte de pitcheo:", error);
      alert("Error al generar el reporte de pitcheo.");
    }
  };

  return (
    <div className="button-container">
      <div className="button-report">
        <button type="button" onClick={generarReportePitcheo}>
          Reporte Pitcheo
        </button>
      </div>
    </div>
  );
}

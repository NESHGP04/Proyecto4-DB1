export default function ReportPos({ temporadaId = 1 }) {
  // Crear CSV de posiciones
  const generarReportePosiciones = async () => {
    try {
      // Ajusta la URL al endpoint real de posiciones/ranking
      const response = await fetch(
        `http://localhost:3001/api/ranking_equipos_torneo`
      );
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const contentType = response.headers.get("content-type");
      console.log("Content-Type:", contentType);
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Respuesta no es JSON");
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        alert("No hay datos de posiciones para exportar.");
        return;
      }

      const encabezado = [
        "ID",
        "Torneo",
        "Equipo",
        "División",
        "Puntos",
        "Ganados",
        "Perdidos",
        "Empatados",
      ];
      const filas = data.map((r) => [
        r.id ?? "",
        r.torneos?.nombre ?? "",
        r.equipos?.nombre ?? "",
        r.division?.nombre ?? "",
        r.puntos ?? "",
        r.partidos_ganados ?? "",
        r.partidos_perdidos ?? "",
        r.partidos_empatados ?? "",
      ]);

      const csvContent = [encabezado, ...filas]
        .map((row) => row.map((item) => `"${item}"`).join(","))
        .join("\r\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_posiciones.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar reporte de posiciones:", error);
      alert("Error al generar el reporte de posiciones.");
    }
  };

  return (
    <div className="button-container">
      <div className="button-report">
        <button type="button" onClick={generarReportePosiciones}>
          Reporte Posiciones
        </button>
      </div>
    </div>
  );
}

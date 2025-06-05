export default function ResportPic(){
    // Crear CSV
    const generarReportePicheo = async () => {
        try {
            const response = await fetch('http://localhost:3001/equipos');
            const equipos = await response.json();

            if (!equipos || equipos.length === 0) {
                alert("No hay equipos para exportar.");
                return;
            }

            const encabezado = ["Ponches","JG","Efectividad","Porcentaje ganados","División","Jugador", "Equipo", "Promedio"];
            const filas = equipos.map(p => [p.division,p.jugador, p.equipo, p.ave]);

            const csvContent = [encabezado, ...filas]
                .map(row => row.join(","))
                .join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "reporte_pacientes.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error al generar reporte:", error);
            alert("Error al generar el reporte.");
        }
    };

    return(
        <div className="button-container">
            <div className="button-report">
                <button onClick={generarReportePicheo}>Reporte Picheo</button>
            </div>
        </div>
    );
}
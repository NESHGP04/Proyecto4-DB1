export default function ResportPos(){
    // Crear CSV
    const generarReportePosiciones = async () => {
        try {
            const response = await fetch('http://localhost:3001/equipos');
            const equipos = await response.json();

            if (!equipos || equipos.length === 0) {
                alert("No hay equipos para exportar.");
                return;
            }

            const encabezado = ["División","Equipo", "Posición", "Promedio", "JG", "JP", "TJ"];
            const filas = equipos.map(p => [p.division,p.id_equipo, p.nombre, p.posición, p.ave, p.jg, p.jp, p.tj ]);

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
                <button onClick={generarReportePosiciones}>Reporte Posiciones</button>
            </div>
        </div>
    );
}
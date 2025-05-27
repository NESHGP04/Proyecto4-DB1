import { useNavigate } from "react-router-dom";

const rows = [
  { id: 1, nombre: "Juan", equipo: "AA", AB: 10, TO: 3, TH: 7, H1: 2, H2: 2, H3: 1, HR: 2, CA: 5, CI: 3, BR: 1, K: 2, BB: 1, BG: 1, JB: 1, AVE: 0.7 },
  { id: 2, nombre: "Pepe", equipo: "BB", AB: 15, TO: 5, TH: 10, H1: 4, H2: 2, H3: 2, HR: 2, CA: 4, CI: 2, BR: 0, K: 3, BB: 1, BG: 2, JB: 0, AVE: 0.66 },
  { id: 3, nombre: "José", equipo: "CC", AB: 20, TO: 4, TH: 16, H1: 6, H2: 5, H3: 3, HR: 2, CA: 6, CI: 5, BR: 2, K: 1, BB: 2, BG: 3, JB: 2, AVE: 0.8 }
];

export default function TableAllDiv({ selectedTeam }) {
  const navigate = useNavigate();
  const filteredRows = rows.filter((row) => row.equipo === selectedTeam);

  const totals = filteredRows.reduce((acc, row) => {
    Object.keys(row).forEach((key) => {
      if (key !== "id" && key !== "nombre" && key !== "equipo") {
        acc[key] = (acc[key] || 0) + row[key];
      }
    });
    return acc;
  }, {});

  const aveTotal = filteredRows.length > 0 ? (totals.AVE / filteredRows.length).toFixed(2) : "0.00";

  const handlePlayerClick = (id) => {
    navigate(`/player/${id}`);
  };

  return (
    <div className="employee-info-container">
      <table className="position-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>AB</th>
            <th>TO</th>
            <th>TH</th>
            <th>H1</th>
            <th>H2</th>
            <th>H3</th>
            <th>HR</th>
            <th>CA</th>
            <th>CI</th>
            <th>BR</th>
            <th>K</th>
            <th>BB</th>
            <th>BG</th>
            <th>JB</th>
            <th>AVE</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.id}>
              <td
                className="clickable-player"
                onClick={() => handlePlayerClick(row.id)}
                style={{ cursor: "pointer"}}
              >
                {row.nombre}
              </td>
              <td>{row.AB}</td>
              <td>{row.TO}</td>
              <td>{row.TH}</td>
              <td>{row.H1}</td>
              <td>{row.H2}</td>
              <td>{row.H3}</td>
              <td>{row.HR}</td>
              <td>{row.CA}</td>
              <td>{row.CI}</td>
              <td>{row.BR}</td>
              <td>{row.K}</td>
              <td>{row.BB}</td>
              <td>{row.BG}</td>
              <td>{row.JB}</td>
              <td>{row.AVE}</td>
            </tr>
          ))}
          {filteredRows.length > 0 && (
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td>{totals.AB}</td>
              <td>{totals.TO}</td>
              <td>{totals.TH}</td>
              <td>{totals.H1}</td>
              <td>{totals.H2}</td>
              <td>{totals.H3}</td>
              <td>{totals.HR}</td>
              <td>{totals.CA}</td>
              <td>{totals.CI}</td>
              <td>{totals.BR}</td>
              <td>{totals.K}</td>
              <td>{totals.BB}</td>
              <td>{totals.BG}</td>
              <td>{totals.JB}</td>
              <td><strong>{aveTotal}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

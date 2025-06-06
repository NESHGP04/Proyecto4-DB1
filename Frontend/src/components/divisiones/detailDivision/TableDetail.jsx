import { useParams } from "react-router-dom";
import { useDivision } from '@/context/DivisionContext';
import { useTeam } from '@/context/TeamContext';
import { useEstadisticas } from '@/hooks/useEstadisticas';

function TableDetail() {
  const { id: jugadorId } = useParams();
  const { division: divisionId } = useDivision();
  const { team: equipoId } = useTeam();
  const { stats, loading } = useEstadisticas(jugadorId, divisionId, equipoId);

    if (loading) return <p>Cargando estadísticas...</p>;
    if (!stats.length) return <p>No se encontraron estadísticas para este jugador.</p>;

  const filteredRows = stats;

  // Calcular totales
  const totals = filteredRows.reduce(
    (acc, row) => {
      acc.AB += row.AB;
      acc.TO += row.TO;
      acc.TH += row.TH;
      acc.H1 += row.H1;
      acc.H2 += row.H2;
      acc.H3 += row.H3;
      acc.HR += row.HR;
      acc.CA += row.CA;
      acc.CI += row.CI;
      acc.BR += row.BR;
      acc.K += row.K;
      acc.BB += row.BB;
      acc.BG += row.BG;
      acc.JB += row.JB;
      return acc;
    },
    {
      AB: 0,
      TO: 0,
      TH: 0,
      H1: 0,
      H2: 0,
      H3: 0,
      HR: 0,
      CA: 0,
      CI: 0,
      BR: 0,
      K: 0,
      BB: 0,
      BG: 0,
      JB: 0,
    }
  );

  // Calcular promedio general (promedio de AVE)
  const aveTotal =
    filteredRows.length > 0
      ? (
          filteredRows.reduce((sum, row) => sum + row.AVE, 0) /
          filteredRows.length
        ).toFixed(3) //era 2
      : 0;

  return (
    <div className="employee-info-container">
        <p>Bateo</p>
      <table className="position-table">
        <thead>
          <tr>
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
          {filteredRows.map((row, idx) => (
            <tr key={idx}>
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
              <td>{row.AVE.toFixed(3)}</td>
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

      <p>Fildeo</p>
      <table className="position-table">
        <thead>
          <tr>
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
              <td>{row.AVE.toFixed(3)}</td>
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

export default TableDetail;

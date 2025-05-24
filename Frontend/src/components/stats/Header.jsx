import { useState } from 'react';
import '@styles/Stats.css'

function Header(){
    const [year, setYear] = useState(2024); // Año fijo por defecto
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');

    const handleChange = (e) => {
        const selectedYear = parseInt(e.target.value);
        setYear(selectedYear);
        setStartDate(`${selectedYear}-01-01`);
        setEndDate(`${selectedYear}-12-31`);
    };

    return (
     <>
        <div className="header-container">
            <h1 className="header">Estadísticas {year}</h1>
            <select value={year} onChange={handleChange} className="year-selector">
            {Array.from({ length: 10 }, (_, i) => 2024 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
            ))}
            </select>
        </div>

        <div className="dates-container">
            <label>
            Inicio: {startDate}
            </label>
            <label>
            Fin: {endDate}
            </label>
        </div>
    </>   
  );
}

export default Header
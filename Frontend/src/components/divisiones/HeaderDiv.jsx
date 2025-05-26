import { useYear } from '@context/YearContext';
import '@styles/Divisiones.css'

function HeaderDiv(){
    const { year, setYear } = useYear();

    const handleChange = (e) => {
        const selectedYear = parseInt(e.target.value);
        setYear(selectedYear);
    };

    return (
     <>
        <div className="header-container">
            <h1 className="header">Divisiones {year}</h1>
            <select value={year} onChange={handleChange} className="year-selector">
            {Array.from({ length: 10 }, (_, i) => 2024 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
            ))}
            </select>
        </div>
    </>   
  );
}

export default HeaderDiv
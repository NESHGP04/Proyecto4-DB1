import Navbar from '@components/navigation/Navbar'
import Calendario from '@components/calendar/Calendario'
import 'react-calendar/dist/Calendar.css';
import HeaderCal from '@components/calendar/HeaderCal';

function CalendarWidget(){
    return(
        <div className='calendar-page'>
            <Navbar />
            <HeaderCal />
            <div className="calendar-content">
                <Calendario />
            </div>
        </div>
    )
}

export default CalendarWidget
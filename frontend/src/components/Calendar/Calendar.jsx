import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek } from 'date-fns';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const getDaysInMonth = () => {
        const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }); // 1 for Monday
        const end = endOfMonth(currentDate);

        const days = eachDayOfInterval({ start, end });

        return days;
    };

    return (
        <div>
            <h1>{format(currentDate, 'MMMM yyyy')}</h1>
            <button onClick={prevMonth}>Anterior Mes</button>
            <button onClick={nextMonth}>Siguiente Mes</button>
            <table>
                <thead>
                    <tr>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Sábado</th>
                        <th>Domingo</th>
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {getDaysInMonth().slice(row * 7, (row + 1) * 7).map((day, index) => (
                                <td key={index}>{day ? format(day, 'd') : ''}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar
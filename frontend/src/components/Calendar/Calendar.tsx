import { useState } from 'react';
import CalendarDays from './CalendarDays';
import { CalendarProps } from '../../utils/props';
import NextIcon from '../../assets/images/black-next-icon.png';
import PrevIcon from '../../assets/images/black-previous-icon.png';
import './Calendar.css';

const Calendar = ({
  events,
  toDos,
  handleSelectEvent,
  handleSelectSlot,
  getEventStyle,
}: CalendarProps) => {
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(
    new Date(currentYear, currentMonth, currentDay)
  );

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const nextMonth = () => {
    if (currentMonth + 1 > 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth - 1 < 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>
          <img className="icon calendar-icon" src={PrevIcon} alt="previous" />
        </button>
        <h2 className="calendar-header-text">
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={nextMonth}>
          <img className="icon calendar-icon" src={NextIcon} alt="next" />
        </button>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((day, index) => (
            <div key={index} className="weekday">
              <p className="weekday-text">{day}</p>
            </div>
          ))}
        </div>
        <CalendarDays
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          setCurrentDate={setCurrentDate}
          events={events}
          toDos={toDos}
          handleSelectEvent={handleSelectEvent}
          handleSelectSlot={handleSelectSlot}
          getEventStyle={getEventStyle}
        />
      </div>
      <p>{currentDate.toDateString()}</p>
    </div>
  );
};

export default Calendar;

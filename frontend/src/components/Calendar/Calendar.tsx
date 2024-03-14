import { useState } from 'react';
import CalendarDays from './CalendarDays';
import { CalendarProps } from '../../utils/props';
import NextIcon from '../../assets/images/black-next-icon.png';
import NextTransparentIcon from '../../assets/images/black-next-icon-transparent.png';
import PrevIcon from '../../assets/images/black-previous-icon.png';
import PrevTransparentIcon from '../../assets/images/black-previous-icon-transparent.png';

import './Calendar.css';

const Calendar = ({
  events,
  toDos,
  handleSelectEvent,
  handleSelectSlot,
  handleSelectDay,
  getEventStyle,
  currentDay,
  setCurrentDay,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  currentDate,
  setCurrentDate,
  dateFormData,
  setDateFormData,
}: CalendarProps) => {
  const [hoverPrevIcon, setHoverPrevIcon] = useState(PrevTransparentIcon);
  const [hoverNextIcon, setHoverNextIcon] = useState(NextTransparentIcon);

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
      const newYear = currentYear + 1;
      setCurrentYear(newYear);
    } else {
      const newMonth = currentMonth + 1;
      setCurrentMonth(newMonth);
    }
  };

  const prevMonth = () => {
    if (currentMonth - 1 < 0) {
      setCurrentMonth(11);
      const newYear = currentYear - 1;
      setCurrentYear(newYear);
    } else {
      const newMonth = currentMonth - 1;
      setCurrentMonth(newMonth);
    }
  };

  const toggleIcon = (type: string) => {
    if (type === 'prev') {
      if (hoverPrevIcon === PrevIcon) {
        setHoverPrevIcon(PrevTransparentIcon);
      } else {
        setHoverPrevIcon(PrevIcon);
      }
    }

    if (type === 'next') {
      if (hoverNextIcon === NextIcon) {
        setHoverNextIcon(NextTransparentIcon);
      } else {
        setHoverNextIcon(NextIcon);
      }
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>
          <img
            className="icon calendar-icon"
            src={hoverPrevIcon}
            alt="previous"
            onMouseOver={() => toggleIcon('prev')}
            onMouseLeave={() => toggleIcon('prev')}
          />
        </button>
        <h2 className="calendar-header-text">
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={nextMonth}>
          <img
            className="icon calendar-icon"
            src={hoverNextIcon}
            alt="next"
            onMouseOver={() => toggleIcon('next')}
            onMouseLeave={() => toggleIcon('next')}
          />
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
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          events={events}
          toDos={toDos}
          handleSelectEvent={handleSelectEvent}
          handleSelectSlot={handleSelectSlot}
          handleSelectDay={handleSelectDay}
          getEventStyle={getEventStyle}
          dateFormData={dateFormData}
          setDateFormData={setDateFormData}
        />
      </div>
      <p>{currentDate.toDateString()}</p>
    </div>
  );
};

export default Calendar;

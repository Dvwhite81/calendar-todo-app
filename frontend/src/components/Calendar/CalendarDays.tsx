import { getCurrentDays } from '../../utils/helpers';
import { CalendarDaysProps } from '../../utils/props';

const CalendarDays = ({
  currentDay,
  setCurrentDay,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  setCurrentDate,
  events,
  toDos,
  handleSelectEvent,
  handleSelectSlot,
  getEventStyle,
}: CalendarDaysProps) => {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const weekdayOfFirstDay = firstDay.getDay();
  const currentDays = getCurrentDays(
    currentDay,
    currentMonth,
    currentYear,
    firstDay,
    weekdayOfFirstDay
  );

  const setDay = (year: number, month: number, day: number) => {
    setCurrentDay(day);
    setCurrentMonth(month);
    setCurrentYear(year);
    setCurrentDate(new Date(year, month, day));
  };

  const handleDayClick = (year: number, month: number, day: number) => {
    setDay(year, month, day);
    // Open Modal
  };

  return (
    <div className="table-content">
      {currentDays.map((d) => (
        <div
          key={`${d.date.getMonth()} ${d.date.getDate()}`}
          className={
            'calendar-day' +
            (d.currentMonth ? ' current' : '') +
            (d.selected ? ' selected' : '')
          }
          onClick={() => handleDayClick(d.year, d.month, d.number)}
        >
          <p className="calendar-day-text">{d.number}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;

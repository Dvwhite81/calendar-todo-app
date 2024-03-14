import { getCurrentDays, getEventsForDay } from '../../utils/helpers';
import { CalendarProps } from '../../utils/props';
import { CurrentDayType } from '../../utils/types';
import InfoIcon from '../../assets/images/info-icon.png';

const CalendarDays = ({
  events,
  currentDay,
  setCurrentDay,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  setCurrentDate,
  handleSelectDay,
  dateFormData,
  setDateFormData,
}: CalendarProps) => {
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

  const handleDayClick = (calendarDay: CurrentDayType) => {
    setDay(calendarDay.year, calendarDay.month, calendarDay.number);
    setDateFormData({
      ...dateFormData,
      start: calendarDay.date,
      end: calendarDay.date,
    });

    // Open Modal
    const day = calendarDay.date;
    const eventsForDay = getEventsForDay(day, events);
    console.log('handleDayClick events:', eventsForDay);
    if (eventsForDay.length > 0) {
      handleSelectDay(day);
    }
  };

  const hasEvent = (calendarDay: CurrentDayType): boolean => {
    const day = calendarDay.date;
    const eventsForDay = getEventsForDay(day, events);
    return eventsForDay.length > 0;
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
          onClick={() => handleDayClick(d)}
        >
          <p className="calendar-day-text">{d.number}</p>
          {hasEvent(d) && (
            <img
              className="icon info-icon"
              src={InfoIcon}
              alt="get event info"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;

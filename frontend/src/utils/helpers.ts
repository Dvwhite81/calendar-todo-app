import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { dateFnsLocalizer } from 'react-big-calendar';
import { DateFormData, EventFormData } from './types';

export const locales = {
  'en-US': enUS,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const generateId = () =>
  (Math.floor(Math.random() * 10000) + 1).toString();

export const initialEventFormState: EventFormData = {
  description: '',
  toDoId: undefined,
};

export const initialDateFormData: DateFormData = {
  description: '',
  toDoId: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
};

export const getCurrentDays = (
  day: number,
  month: number,
  year: number,
  firstDay: Date,
  weekdayOfFirstDay: number
) => {
  const currentDays = [];

  for (let d = 0; d < 42; d++) {
    if (d === 0 && weekdayOfFirstDay === 0) {
      firstDay.setDate(firstDay.getDate() - 7);
    } else if (d === 0) {
      firstDay.setDate(firstDay.getDate() + (d - weekdayOfFirstDay));
    } else {
      firstDay.setDate(firstDay.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDay.getMonth() === month,
      date: new Date(firstDay),
      month: firstDay.getMonth(),
      number: firstDay.getDate(),
      selected:
        firstDay.toDateString() === new Date(year, month, day).toDateString(),
      year: firstDay.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return currentDays;
};

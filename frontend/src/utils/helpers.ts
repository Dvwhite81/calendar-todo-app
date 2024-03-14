import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { eachDayOfInterval } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import { DateFormData, EventFormData, EventInfoType } from './types';

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
  start: new Date(),
  end: new Date(),
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

    const calendarDay = {
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

export const getUrgencyColor = (urgency: string) => {
  return urgency === 'normal'
    ? 'green'
    : urgency === 'urgent'
    ? 'yellow'
    : 'red';
};

export const getEventDateRange = (event: EventInfoType): Date[] => {
  const { start, end } = event;
  if (!start) return [];
  if (!end) return [start];

  return eachDayOfInterval({
    start: new Date(start),
    end: new Date(end),
  });
};

export const getEventsForDay = (
  day: Date,
  events: EventInfoType[]
): EventInfoType[] => {
  const date = day.toDateString();

  console.log('getEventsForDay events:', events);
  const dayEvents = [];
  for (const e of events) {
    const range = getEventDateRange(e);
    if (range && range.toString().includes(date.toString())) {
      dayEvents.push(e);
    }
  }

  return dayEvents;
};

export const dataIsEventTypes = (events: unknown[]) => {
  if (!events) return;

  for (const event of events) {
    if (
      !event ||
      typeof event !== 'object' ||
      '_id' in event ||
      'allDay' in event ||
      'description' in event ||
      'end' in event ||
      'resource' in event ||
      'start' in event ||
      'title' in event ||
      'toDoId' in event
    ) {
      return false;
    }
  }

  return true;
};

export const dataIsToDoTypes = (toDos: unknown[]) => {
  if (!toDos) return;

  for (const toDo of toDos) {
    if (
      !toDo ||
      typeof toDo !== 'object' ||
      '_id' in toDo ||
      'color' in toDo ||
      'title' in toDo ||
      'urgency' in toDo
    ) {
      return false;
    }
  }

  return true;
};

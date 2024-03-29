import { Dispatch, MouseEvent, SetStateAction, SyntheticEvent } from 'react';
import {
  DateFormData,
  EventFormData,
  EventInfoType,
  EventStyleType,
  ToDo,
  UserType,
} from './types';
import { Event as BigEvent } from 'react-big-calendar';

export interface EventModalProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  eventFormData: EventFormData;
  setEventFormData: Dispatch<SetStateAction<EventFormData>>;
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  toDos: ToDo[];
}

export interface InfoModalProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  onDeleteEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  currentEvent: EventInfoType | null;
}

export interface DateModalProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  dateFormData: DateFormData;
  setDateFormData: Dispatch<SetStateAction<DateFormData>>;
  onAddDate: (e: MouseEvent<HTMLButtonElement>) => void;
  currentDate: Date;
  toDos: ToDo[];
}

export interface ToDoModalProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  toDos: ToDo[];
  setToDos: Dispatch<SetStateAction<ToDo[]>>;
  loggedInUser: UserType | null;
}

export interface DayEventsModalProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  onDeleteEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  currentDate: Date;
  events: EventInfoType[];
}

export interface EventInfoProps {
  event: EventInfoType;
}

export interface CalendarProps {
  events: EventInfoType[];
  toDos: ToDo[];
  handleSelectEvent: (event: EventInfoType) => void;
  handleSelectSlot: (event: BigEvent) => void;
  handleSelectDay: (date: Date) => void;
  getEventStyle: (event: EventInfoType) => EventStyleType;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  currentMonth: number;
  setCurrentMonth: (month: number) => void;
  currentYear: number;
  setCurrentYear: (year: number) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  dateFormData: DateFormData;
  setDateFormData: Dispatch<SetStateAction<DateFormData>>;
}

export interface EventAndToDoProps {
  events: EventInfoType[];
  setEvents: Dispatch<SetStateAction<EventInfoType[]>>;
  toDos: ToDo[];
  setToDos: Dispatch<SetStateAction<ToDo[]>>;
  loggedInUser: UserType | null;
}

export interface HomeProps extends EventAndToDoProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  loggedInUser: UserType | null;
}

export interface AllModalsProps {
  toDos: ToDo[];
  setToDos: Dispatch<SetStateAction<ToDo[]>>;
  openSlot: boolean;
  handleEventModalClose: () => void;
  eventFormData: EventFormData;
  setEventFormData: Dispatch<SetStateAction<EventFormData>>;
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  dateModalOpen: boolean;
  handleDateModalClose: () => void;
  dateFormData: DateFormData;
  setDateFormData: Dispatch<SetStateAction<DateFormData>>;
  onAddDate: (e: MouseEvent<HTMLButtonElement>) => void;
  infoModalOpen: boolean;
  handleInfoModalClose: () => void;
  onDeleteEvent: () => void;
  currentEvent: BigEvent | EventInfoType | null;
  toDoModalOpen: boolean;
  handleToDoModalClose: () => void;
  currentDate: Date;
  events: EventInfoType[];
  dayEventsModalOpen: boolean;
  handleDayEventsModalClose: () => void;
  loggedInUser: UserType | null;
}

export interface AgendaProps {
  loggedInUser: UserType;
  toDos: ToDo[];
  events: EventInfoType[];
}

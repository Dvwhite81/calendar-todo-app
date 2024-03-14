import { Event as BigEvent } from 'react-big-calendar';

export interface UserType {
  _id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: UserType;
  token?: string;
}

export interface UserResult {
  success: boolean;
  message: string;
}

export interface ToDo {
  _id: string;
  title: string;
  urgency: string;
  color: string;
}

export interface EventInfoType extends BigEvent {
  _id: string;
  description: string;
  toDoId?: string;
}

export interface EventFormData {
  description: string;
  toDoId?: string;
}

export interface DateFormData {
  description: string;
  toDoId?: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
}

export interface EventStyleType {
  style: {
    backgroundColor: string | undefined;
    borderColor: string | undefined;
  };
}

export interface CurrentDayType {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
}

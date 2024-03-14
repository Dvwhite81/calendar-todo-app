import { MouseEvent, useState } from 'react';
import { Event as BigEvent } from 'react-big-calendar';

// import EventInfo from './EventInfo';
import { DateFormData, EventFormData, EventInfoType } from '../../utils/types';
import {
  generateId,
  initialDateFormData,
  initialEventFormState,
} from '../../utils/helpers';
import Calendar from '../Calendar/Calendar';
import { EventAndToDoProps } from '../../utils/props';
import Modals from '../Modals/Modals';
import userService from '../../services/userService';

const EventCalendar = ({
  events,
  setEvents,
  toDos,
  setToDos,
  loggedInUser,
}: EventAndToDoProps) => {
  const [openSlot, setOpenSlot] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [toDoModalOpen, setToDoModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<
    BigEvent | EventInfoType | null
  >(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [dayEventsModalOpen, setDayEventsModalOpen] = useState(false);

  const [eventFormData, setEventFormData] = useState<EventFormData>(
    initialEventFormState
  );
  const [dateFormData, setDateFormData] =
    useState<DateFormData>(initialDateFormData);

  const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentDate, setCurrentDate] = useState(
    new Date(currentYear, currentMonth, currentDay)
  );

  const handleSelectSlot = (event: BigEvent) => {
    console.log('handleSelectSlot');
    setOpenSlot(true);
    setCurrentEvent(event);
  };

  const handleSelectEvent = (event: EventInfoType) => {
    console.log('handleSelectEvent');
    setCurrentEvent(event);
    setInfoModalOpen(true);
  };

  const handleSelectDay = (date: Date) => {
    console.log('handleSelectDay');
    setCurrentDate(date);
    setDayEventsModalOpen(true);
  };

  const getEventStyle = (event: EventInfoType) => {
    const hasTodo = toDos.find((toDo) => toDo._id === event.toDoId);
    return {
      style: {
        backgroundColor: hasTodo ? hasTodo.color : '#b64fc8',
        borderColor: hasTodo ? hasTodo.color : '#b64fc8',
      },
    };
  };

  const handleEventModalClose = () => {
    setEventFormData(initialEventFormState);
    setOpenSlot(false);
  };

  const handleDateModalClose = () => {
    setDateFormData(initialDateFormData);
    setDateModalOpen(false);
  };

  const handleInfoModalClose = () => {
    setInfoModalOpen(false);
  };

  const handleToDoModalClose = () => {
    setToDoModalOpen(false);
  };

  const handleDayEventsModalClose = () => {
    setDayEventsModalOpen(false);
  };

  const saveEvent = async (event: EventInfoType) => {
    console.log('saveEvent event:', event);
    console.log('loggedInUser:', loggedInUser);
    console.log('username:', loggedInUser?.username);
    if (!loggedInUser || !loggedInUser.username) return;

    const { username } = loggedInUser;

    await userService.addUserEvent(username, event);
  };

  const onAddEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: EventInfoType = {
      ...eventFormData,
      _id: generateId(),
      start: currentEvent?.start,
      end: currentEvent?.end,
    };

    const newEvents = [...events, data];

    saveEvent(data);
    setEvents(newEvents);
    handleEventModalClose();
  };

  const onAddDate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addHours = (date: Date | undefined, hours: number) => {
      return date ? date.setHours(date.getHours() + hours) : undefined;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setMinToZero = (date: any) => {
      date.setSeconds(0);
      return date;
    };

    const data: EventInfoType = {
      ...dateFormData,
      _id: generateId(),
      start: setMinToZero(dateFormData.start),
      end: dateFormData.allDay
        ? addHours(dateFormData.start, 12)
        : setMinToZero(dateFormData.end),
    };

    const newEvents = [...events, data];

    saveEvent(data);
    setEvents(newEvents);
    handleDateModalClose();
  };

  const onDeleteEvent = () => {
    setEvents(() =>
      [...events].filter((e) => e._id !== (currentEvent as EventInfoType)._id!)
    );
    setInfoModalOpen(false);
  };

  return (
    <div className="event-calendar-container">
      <div className="event-calendar">
        <div className="card">
          <div className="card-header">
            <div className="box">
              <div className="button-group">
                <button
                  onClick={() => setDateModalOpen(true)}
                  type="button"
                  className="btn card-btn"
                >
                  Add event
                </button>
                <button
                  onClick={() => setToDoModalOpen(true)}
                  type="button"
                  className="btn card-btn"
                >
                  Create toDo
                </button>
              </div>
            </div>
          </div>
          <div className="card-content">
            <Modals
              toDos={toDos}
              setToDos={setToDos}
              openSlot={openSlot}
              handleEventModalClose={handleEventModalClose}
              eventFormData={eventFormData}
              setEventFormData={setEventFormData}
              onAddEvent={onAddEvent}
              dateModalOpen={dateModalOpen}
              handleDateModalClose={handleDateModalClose}
              dateFormData={dateFormData}
              setDateFormData={setDateFormData}
              onAddDate={onAddDate}
              infoModalOpen={infoModalOpen}
              handleInfoModalClose={handleInfoModalClose}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent}
              toDoModalOpen={toDoModalOpen}
              handleToDoModalClose={handleToDoModalClose}
              currentDate={currentDate}
              events={events}
              dayEventsModalOpen={dayEventsModalOpen}
              handleDayEventsModalClose={handleDayEventsModalClose}
              loggedInUser={loggedInUser}
            />
            <Calendar
              events={events}
              toDos={toDos}
              handleSelectEvent={handleSelectEvent}
              handleSelectSlot={handleSelectSlot}
              handleSelectDay={handleSelectDay}
              getEventStyle={getEventStyle}
              currentDay={currentDay}
              setCurrentDay={setCurrentDay}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              dateFormData={dateFormData}
              setDateFormData={setDateFormData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;

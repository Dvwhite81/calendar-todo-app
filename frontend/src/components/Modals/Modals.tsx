import { AllModalsProps } from '../../utils/props';
import { EventInfoType } from '../../utils/types';
import DateModal from './DateModal';
import EventModal from './EventModal';
import InfoModal from './InfoModal';
import ToDoModal from './ToDoModal';
import './Modals.css';
import DayEventsModal from './DayEventsModal';

const Modals = ({
  toDos,
  setToDos,
  openSlot,
  handleEventModalClose,
  eventFormData,
  setEventFormData,
  onAddEvent,
  dateModalOpen,
  handleDateModalClose,
  dateFormData,
  setDateFormData,
  onAddDate,
  infoModalOpen,
  handleInfoModalClose,
  onDeleteEvent,
  currentEvent,
  toDoModalOpen,
  handleToDoModalClose,
  currentDate,
  events,
  dayEventsModalOpen,
  handleDayEventsModalClose,
  loggedInUser,
}: AllModalsProps) => {
  return (
    <>
      <EventModal
        open={openSlot}
        handleClose={handleEventModalClose}
        eventFormData={eventFormData}
        setEventFormData={setEventFormData}
        onAddEvent={onAddEvent}
        toDos={toDos}
      />
      <DateModal
        open={dateModalOpen}
        handleClose={handleDateModalClose}
        dateFormData={dateFormData}
        setDateFormData={setDateFormData}
        onAddDate={onAddDate}
        currentDate={currentDate}
        toDos={toDos}
      />
      <InfoModal
        open={infoModalOpen}
        handleClose={handleInfoModalClose}
        onDeleteEvent={onDeleteEvent}
        currentEvent={currentEvent as EventInfoType}
      />
      <ToDoModal
        open={toDoModalOpen}
        handleClose={handleToDoModalClose}
        toDos={toDos}
        setToDos={setToDos}
        loggedInUser={loggedInUser}
      />
      <DayEventsModal
        open={dayEventsModalOpen}
        handleClose={handleDayEventsModalClose}
        onDeleteEvent={onDeleteEvent}
        currentDate={currentDate}
        events={events}
      />
    </>
  );
};

export default Modals;

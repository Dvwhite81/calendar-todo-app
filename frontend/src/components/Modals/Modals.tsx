import { AllModalsProps } from '../../utils/props';
import { EventInfoType } from '../../utils/types';
import DateModal from './DateModal';
import EventModal from './EventModal';
import InfoModal from './InfoModal';
import ToDoModal from './ToDoModal';
import './Modals.css';

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
        onAddEvent={onAddDate}
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
      />
    </>
  );
};

export default Modals;

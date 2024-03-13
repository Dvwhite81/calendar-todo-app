import { MouseEvent, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
} from '@mui/material';

// import EventInfo from './EventInfo';
import EventModal from '../Modals/EventModal';
import InfoModal from '../Modals/InfoModal';
import DateModal from '../Modals/DateModal';
import ToDoModal from '../Modals/ToDoModal';

import { Event as BigEvent } from 'react-big-calendar';

import { DateFormData, EventFormData, EventInfoType } from '../../utils/types';
import {
  generateId,
  initialDateFormData,
  initialEventFormState,
} from '../../utils/helpers';
import Calendar from '../Calendar/Calendar';
import { EventAndToDoProps } from '../../utils/props';

const EventCalendar = ({
  events,
  setEvents,
  toDos,
  setToDos,
}: EventAndToDoProps) => {
  const [openSlot, setOpenSlot] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [toDoModalOpen, setToDoModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<
    BigEvent | EventInfoType | null
  >(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [eventFormData, setEventFormData] = useState<EventFormData>(
    initialEventFormState
  );
  const [dateFormData, setDateFormData] =
    useState<DateFormData>(initialDateFormData);

  const handleSelectSlot = (event: BigEvent) => {
    setOpenSlot(true);
    setCurrentEvent(event);
  };

  const handleSelectEvent = (event: EventInfoType) => {
    setCurrentEvent(event);
    setInfoModalOpen(true);
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

  const onAddEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: EventInfoType = {
      ...eventFormData,
      _id: generateId(),
      start: currentEvent?.start,
      end: currentEvent?.end,
    };

    const newEvents = [...events, data];

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

    setEvents(newEvents);
    handleEventModalClose();
  };

  const onDeleteEvent = () => {
    setEvents(() =>
      [...events].filter((e) => e._id !== (currentEvent as EventInfoType)._id!)
    );
    setInfoModalOpen(false);
  };

  return (
    <Box
      mt={2}
      mb={2}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <Divider />
          <CardHeader>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ButtonGroup
                size="large"
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => setDateModalOpen(true)}
                  size="small"
                  variant="contained"
                >
                  Add event
                </Button>
                <Button
                  onClick={() => setToDoModalOpen(true)}
                  size="small"
                  variant="contained"
                >
                  Create toDo
                </Button>
              </ButtonGroup>
            </Box>
            <Divider style={{ margin: 10 }} />
          </CardHeader>
          <CardContent>
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
            <Calendar
              events={events}
              toDos={toDos}
              handleSelectEvent={handleSelectEvent}
              handleSelectSlot={handleSelectSlot}
              getEventStyle={getEventStyle}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EventCalendar;

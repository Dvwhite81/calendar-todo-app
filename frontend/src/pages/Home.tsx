import EventCalendar from '../components/Events/EventCalendar';

import { HomeProps } from '../utils/props';

const Home = ({
  events,
  setEvents,
  toDos,
  setToDos,
  loggedInUser,
}: HomeProps) => {
  return (
    <div className="page">
      <EventCalendar
        events={events}
        setEvents={setEvents}
        toDos={toDos}
        setToDos={setToDos}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default Home;

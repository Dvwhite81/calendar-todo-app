import EventCalendar from '../components/Events/EventCalendar';

import { HomeProps } from '../utils/props';

const Home = ({ events, setEvents, toDos, setToDos }: HomeProps) => {
  return (
    <div className="page">
      <EventCalendar
        events={events}
        setEvents={setEvents}
        toDos={toDos}
        setToDos={setToDos}
      />
    </div>
  );
};

export default Home;

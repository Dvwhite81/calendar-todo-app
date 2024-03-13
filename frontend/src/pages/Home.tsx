import { Container } from 'react-bootstrap';
import EventCalendar from '../components/Events/EventCalendar';
import { HomeProps } from '../utils/props';

const Home = ({ events, setEvents, toDos, setToDos }: HomeProps) => {
  return (
    <Container fluid>
      <EventCalendar
        events={events}
        setEvents={setEvents}
        toDos={toDos}
        setToDos={setToDos}
      />
    </Container>
  );
};

export default Home;

import { AgendaProps } from '../utils/props';

const Agenda = ({ loggedInUser, toDos, events }: AgendaProps) => {
  const { username } = loggedInUser;

  return (
    <div className="page">
      <p>Username: {username}</p>
      <p>Events:</p>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <p>Event: {event.description}</p>
            <p>Date: {event.start?.toDateString()}</p>
          </li>
        ))}
      </ul>
      <p>ToDos:</p>
      <ul>
        {toDos.map((toDo, index) => (
          <li key={index}>
            <p>{toDo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agenda;

import { EventInfoProps } from '../../utils/props';

const EventInfo = ({ event }: EventInfoProps) => {
  return <p>{event.description}</p>;
};

export default EventInfo;

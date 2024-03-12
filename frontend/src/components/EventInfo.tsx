import { Typography } from '@mui/material';
import { EventInfoProps } from '../utils/props';

const EventInfo = ({ event }: EventInfoProps) => {
  return (
    <>
      <Typography>{event.description}</Typography>
    </>
  );
};

export default EventInfo;

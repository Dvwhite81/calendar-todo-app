import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { DayEventsModalProps } from '../../utils/props';
import { EventInfoType } from '../../utils/types';
import { getEventsForDay } from '../../utils/helpers';

const DayEventsModal = ({
  open,
  handleClose,
  onDeleteEvent,
  currentDate,
  events,
}: DayEventsModalProps) => {
  const onClose = () => handleClose();

  console.log('dayeventsmodal events:', events);
  const dayEvents = getEventsForDay(currentDate, events);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Events For Day</DialogTitle>
      <Box>
        {dayEvents.map((currentEvent: EventInfoType) => (
          <Box key={currentEvent._id}>
            <DialogContent>
              {currentEvent?.start !== undefined && (
                <Typography
                  sx={{ fontSize: 16, marginTop: 1 }}
                  color="text.primary"
                  gutterBottom
                >
                  Start: {currentEvent?.start?.toDateString()}
                </Typography>
              )}
              {currentEvent?.end !== undefined && (
                <Typography
                  sx={{ fontSize: 16, marginTop: 1 }}
                  color="text.primary"
                  gutterBottom
                >
                  End: {currentEvent?.end?.toDateString()}
                </Typography>
              )}
              <Typography
                sx={{ fontSize: 14, marginTop: 1 }}
                color="text.secondary"
                gutterBottom
              >
                {currentEvent?.description}
              </Typography>
              <Box component="form"></Box>
            </DialogContent>
          </Box>
        ))}
      </Box>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button color="info" onClick={onDeleteEvent}>
          Delete Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DayEventsModal;

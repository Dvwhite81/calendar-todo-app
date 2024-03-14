import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { InfoModalProps } from '../../utils/props';

const InfoModal = ({
  open,
  handleClose,
  onDeleteEvent,
  currentEvent,
}: InfoModalProps) => {
  const onClose = () => handleClose();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Event Info</DialogTitle>
      <DialogContent>
        {currentEvent?.start !== undefined && (
          <DialogContentText>
            <Typography
              sx={{ fontSize: 16, marginTop: 1 }}
              color="text.primary"
              gutterBottom
            >
              Start: {currentEvent?.start?.toDateString()}
            </Typography>
          </DialogContentText>
        )}
        {currentEvent?.end !== undefined && (
          <DialogContentText>
            <Typography
              sx={{ fontSize: 16, marginTop: 1 }}
              color="text.primary"
              gutterBottom
            >
              End: {currentEvent?.end?.toDateString()}
            </Typography>
          </DialogContentText>
        )}
        <DialogContentText>
          <Typography
            sx={{ fontSize: 14, marginTop: 1 }}
            color="text.secondary"
            gutterBottom
          >
            {currentEvent?.description}
          </Typography>
        </DialogContentText>
        <Box component="form"></Box>
      </DialogContent>
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

export default InfoModal;

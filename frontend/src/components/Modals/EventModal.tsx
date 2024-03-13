import { ChangeEvent, SyntheticEvent } from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Autocomplete,
  Box,
} from '@mui/material';
import { ToDo } from '../../utils/types';
import { EventModalProps } from '../../utils/props';

const EventModal = ({
  open,
  handleClose,
  eventFormData,
  setEventFormData,
  onAddEvent,
  toDos,
}: EventModalProps) => {
  const { description } = eventFormData;

  const onClose = () => handleClose();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleToDoChange = (_e: SyntheticEvent, value: ToDo | null) => {
    setEventFormData((prev) => ({
      ...prev,
      toDoId: value?._id,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a event, please fill in the information below.
        </DialogContentText>
        <Box component="form">
          <TextField
            name="description"
            value={description}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
          <Autocomplete
            onChange={handleToDoChange}
            disablePortal
            id="combo-box-demo"
            options={toDos}
            sx={{ marginTop: 4 }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Todo" />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={description === ''}
          color="success"
          onClick={onAddEvent}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;

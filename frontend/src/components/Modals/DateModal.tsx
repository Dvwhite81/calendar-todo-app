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
  Checkbox,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ToDo } from '../../utils/types';
import { DateModalProps } from '../../utils/props';

const DateModal = ({
  open,
  handleClose,
  dateFormData,
  setDateFormData,
  onAddDate,
  toDos,
}: DateModalProps) => {
  const { description, start, end, allDay } = dateFormData;

  const onClose = () => handleClose();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateFormData((prev) => ({
      ...prev,
      allDay: event.target.checked,
    }));
  };

  const handleToDoChange = (_e: SyntheticEvent, value: ToDo | null) => {
    setDateFormData((prev) => ({
      ...prev,
      toDoId: value?._id,
    }));
  };

  const isDisabled = () => {
    const checkEnd = () => {
      if (!allDay && end === null) {
        return true;
      }
    };
    if (description === '' || start === null || checkEnd()) {
      return true;
    }
    return false;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add an event, please fill in the information below.
        </DialogContentText>
        <Box component="form">
          <TextField
            name="description"
            value={description}
            margin="dense"
            id="description"
            label="Description"
            InputLabelProps={{
              style: {
                top: '-10px',
              },
            }}
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mb={2} mt={5}>
              <DateTimePicker
                label="Start date"
                value={start}
                ampm={true}
                minutesStep={30}
                onChange={(newValue) =>
                  setDateFormData((prev) => ({
                    ...prev,
                    start: new Date(newValue!),
                  }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text" component={'span'}>
                All day?
              </Typography>
              <Checkbox onChange={handleCheckboxChange} value={allDay} />
            </Box>

            <DateTimePicker
              label="End date"
              disabled={allDay}
              minDate={start}
              minutesStep={30}
              ampm={true}
              value={allDay ? null : end}
              onChange={(newValue) =>
                setDateFormData((prev) => ({
                  ...prev,
                  end: new Date(newValue!),
                }))
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
        <Button disabled={isDisabled()} color="success" onClick={onAddDate}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateModal;

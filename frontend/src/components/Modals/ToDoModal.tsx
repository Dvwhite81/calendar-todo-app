import { ChangeEvent, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToDoModalProps } from '../../utils/props';
import { generateId, getUrgencyColor } from '../../utils/helpers';
import { FormLabel } from 'react-bootstrap';
import { green, red, yellow } from '@mui/material/colors';
import { ToDo } from '../../utils/types';
import userService from '../../services/userService';

const ToDoModal = ({
  open,
  handleClose,
  toDos,
  setToDos,
  loggedInUser,
}: ToDoModalProps) => {
  const [urgency, setUrgency] = useState('normal');
  const [title, setTitle] = useState('');

  const toDoColor =
    urgency === 'normal' ? 'green' : urgency === 'urgent' ? 'yellow' : 'red';

  const handleUrgencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrgency((event.target as HTMLInputElement).value);
  };

  const saveToDo = async (toDo: ToDo) => {
    if (!loggedInUser || !loggedInUser.username) return;

    const { username } = loggedInUser;

    await userService.addUserToDo(username, toDo);
  };

  const onAddToDo = () => {
    const newToDo = {
      _id: generateId(),
      urgency,
      title,
      color: getUrgencyColor(urgency),
    };

    setToDos([...toDos, newToDo]);
    setTitle('');

    saveToDo(newToDo);
  };

  const onDeleteToDo = (_id: string) =>
    setToDos(toDos.filter((toDo) => toDo._id !== _id));

  const onClose = () => handleClose();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create todos to add to your Calendar.
        </DialogContentText>
        <Box>
          <TextField
            name="title"
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            InputLabelProps={{
              style: {
                top: '-10px',
              },
            }}
            type="text"
            fullWidth
            sx={{ mb: 6 }}
            required
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <FormLabel id="urgency-radio-group-label">Urgency: </FormLabel>
            <RadioGroup
              aria-labelledby="urgency-radio-group-label"
              defaultValue={'normal'}
              name="urgency-radio-group"
              value={urgency}
              onChange={handleUrgencyChange}
            >
              <FormControlLabel
                value="normal"
                control={
                  <Radio
                    sx={{
                      color: green[600],
                      '&.Mui-checked': {
                        color: green[600],
                      },
                    }}
                  />
                }
                label="Normal"
              />
              <FormControlLabel
                value="urgent"
                control={
                  <Radio
                    sx={{
                      color: yellow[600],
                      '&.Mui-checked': {
                        color: yellow[600],
                      },
                    }}
                  />
                }
                label="Urgent"
              />
              <FormControlLabel
                value="top-priority"
                control={
                  <Radio
                    sx={{
                      color: red[600],
                      '&.Mui-checked': {
                        color: red[600],
                      },
                    }}
                  />
                }
                label="Top Priority"
              />
            </RadioGroup>
          </Box>
          <Box>
            <List sx={{ marginTop: 3 }}>
              {toDos.map((toDo) => (
                <ListItem
                  key={toDo.title}
                  secondaryAction={
                    <IconButton
                      onClick={() => onDeleteToDo(toDo._id)}
                      color="error"
                      edge="end"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Box
                    sx={{
                      height: 40,
                      width: 40,
                      borderRadius: 1,
                      marginRight: 1,
                    }}
                    className="value"
                    style={{ backgroundColor: toDoColor }}
                  ></Box>
                  <ListItemText primary={toDo.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ marginTop: 2 }}>
        <Button
          sx={{ marginRight: 2 }}
          variant="contained"
          color="error"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onAddToDo()}
          disabled={title === '' || urgency === ''}
          sx={{ marginRight: 2 }}
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToDoModal;

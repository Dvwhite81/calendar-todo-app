const { Router } = require('express');
const ToDoModel = require('../models/toDo');

const toDoRouter = Router();

toDoRouter.get('/', async (req, res) => {
  console.log('GET');
  const toDos = await ToDoModel.find({}).populate('user', { username: 1 });
  console.log('toDos:', toDos);
  res.json(toDos);
});

toDoRouter.get('/:id', async (req, res) => {
  const event = await ToDoModel.findById(req.params.id);
  if (event) res.json(event);
  else res.status(404).end();
});

toDoRouter.post('/', async (req, res) => {
  console.log('POST');
  const { body, user } = req;

  if (!user) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }

  const { event } = body;
  const { color, title, urgency } = event;

  const newEvent = new ToDoModel({
    color,
    title,
    urgency,
    user: user.id,
  });

  const savedEvent = await newEvent.save();
  user.toDos = user.toDos.concat(savedEvent._id);
  await user.save();
  res.status(201).json(savedEvent);
});

toDoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: 'missing or invalid token',
    });
  }

  const eventToDelete = await ToDoModel.findById(id);

  if (eventToDelete?.user?.toString() !== user.id.toString()) {
    res.status(401).end();
  } else {
    await ToDoModel.findByIdAndDelete(id);
    res.status(204).end();
  }
});

toDoRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { color, title, urgency } = req.body;

  const event = {
    color,
    title,
    urgency,
  };

  const updatedEvent = await ToDoModel.findByIdAndUpdate(id, event, {
    new: true,
  });
  res.json(updatedEvent);
});

module.exports = toDoRouter;

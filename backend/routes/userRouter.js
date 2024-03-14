const express = require('express');
const User = require('../models/user');
const EventModel = require('../models/event');

const userRouter = express.Router();

// Get user by token
userRouter.get('/:token', async (req, res) => {
  const { token } = req.params;

  const userExists = await User.findOne({ token: token });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that token',
    });
  }

  res.json({
    success: true,
    message: 'Found user by token successfully',
    user: userExists,
  });
});

// Get user events
userRouter.get('/:username/events', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }
  console.log('backend userExists:', userExists);
  console.log('backend userExists.events:', userExists.events);
  res.json({
    success: true,
    events: userExists.events,
  });
});

// Get user toDos
userRouter.get('/:username/toDos', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }
  // console.log('backend userExists.toDos:', userExists.toDos);
  res.json({
    success: true,
    toDos: userExists.toDos,
  });
});

// User save event
userRouter.post('/:username/events', async (req, res) => {
  console.log('req.body:', req.body);

  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const { description, allDay, start, end, _id } = req.body;
  const newEvent = new EventModel({ description, allDay, start, end, _id });
  console.log('backend req.body:', req.body);
  const { events } = userExists;
  console.log('backend userExists:', userExists);
  console.log('backend events:', events);
  console.log('backend newEvent', newEvent);

  userExists.events = userExists.events.concat(newEvent);
  const updatedUser = await userExists.save();

  if (updatedUser) {
    return res.json({
      success: true,
      message: 'Saved event successfully',
      newEvent: newEvent,
      events: updatedUser.events,
    });
  } else {
    return res.json({
      success: false,
      message: 'Error saving event',
    });
  }
});

// User save toDo
userRouter.post('/:username/toDos', async (req, res) => {
  // console.log('req.body:', req.body);

  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const { toDo } = req.body;
  const { toDos } = userExists;
  // console.log('backend userExists:', userExists);
  // console.log('backend toDos:', toDos);
  // console.log('backend toDo', toDo);

  userExists.toDos = [...toDos, toDo];
  const updatedUser = await userExists.save();

  if (updatedUser) {
    return res.json({
      success: true,
      message: 'Saved toDo successfully',
      newToDo: toDo,
      toDos: updatedUser.toDos,
    });
  } else {
    return res.json({
      success: false,
      message: 'Error saving toDo',
    });
  }
});

// User remove saved event
userRouter.put('/:username/events', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const event = req.body;
  const { events } = userExists;

  userExists.events = events.filter((r) => r.uri !== event.uri);
  const updatedUser = await userExists.save();

  if (updatedUser) {
    return res.json({
      success: true,
      message: 'Deleted event successfully',
      events: updatedUser.events,
    });
  } else {
    return res.json({
      success: false,
      message: 'Error deleting event',
    });
  }
});

// User remove saved toDo
userRouter.put('/:username/toDos', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const toDo = req.body;
  const { toDos } = userExists;

  userExists.toDos = toDos.filter((r) => r.uri !== toDo.uri);
  const updatedUser = await userExists.save();

  if (updatedUser) {
    return res.json({
      success: true,
      message: 'Deleted toDo successfully',
      toDos: updatedUser.toDos,
    });
  } else {
    return res.json({
      success: false,
      message: 'Error deleting toDo',
    });
  }
});

module.exports = userRouter;

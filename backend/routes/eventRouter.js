const { Router } = require('express');
const EventModel = require('../models/event');

const eventsRouter = Router();

eventsRouter.get('/', async (req, res) => {
  console.log('GET');
  const events = await EventModel.find({}).populate('user', { username: 1 });
  console.log('events:', events);
  res.json(events);
});

eventsRouter.get('/:id', async (req, res) => {
  const event = await EventModel.findById(req.params.id);
  if (event) res.json(event);
  else res.status(404).end();
});

eventsRouter.post('/', async (req, res) => {
  console.log('POST');
  const { body, user } = req;

  if (!user) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }

  const { event } = body;
  const { allDay, description, end, resource, start, title, toDoId } = event;

  const newEvent = new EventModel({
    allDay,
    description,
    end,
    resource,
    start,
    title,
    toDoId,
    user: user.id,
  });

  const savedEvent = await newEvent.save();
  user.events = user.events.concat(savedEvent._id);
  await user.save();
  res.status(201).json(savedEvent);
});

eventsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: 'missing or invalid token',
    });
  }

  const eventToDelete = await EventModel.findById(id);

  if (eventToDelete?.user?.toString() !== user.id.toString()) {
    res.status(401).end();
  } else {
    await EventModel.findByIdAndDelete(id);
    res.status(204).end();
  }
});

eventsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { allDay, description, end, resource, start, title, toDoId } = req.body;

  const event = {
    allDay,
    description,
    end,
    resource,
    start,
    title,
    toDoId,
  };

  const updatedEvent = await EventModel.findByIdAndUpdate(id, event, {
    new: true,
  });
  res.json(updatedEvent);
});

module.exports = eventsRouter;

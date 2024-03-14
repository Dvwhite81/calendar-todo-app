const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  allDay: {},
  description: {
    type: String,
    required: true,
  },
  end: {},
  start: {},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

eventSchema.set('toJSON', {
  transform: (document, returnedEvent) => {
    returnedEvent.id = returnedEvent._id.toString();
    delete returnedEvent._id;
    delete returnedEvent.__v;
  },
});

const EventModel = mongoose.model('EventModel', eventSchema);
module.exports = EventModel;

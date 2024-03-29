const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

toDoSchema.set('toJSON', {
  transform: (document, returnedToDo) => {
    returnedToDo.id = returnedToDo._id.toString();
    delete returnedToDo._id;
    delete returnedToDo.__v;
  },
});

const ToDoModel = mongoose.model('ToDoModel', toDoSchema);
module.exports = ToDoModel;

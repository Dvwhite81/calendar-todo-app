const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    token: {
      type: String,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventModel',
      },
    ],
    toDos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ToDoModel',
      },
    ],
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (document, returnedUser) => {
    returnedUser.id = returnedUser._id.toString();
    delete returnedUser._id;
    delete returnedUser.__v;
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

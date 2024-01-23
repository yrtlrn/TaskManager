const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name is required'],
    maxLength: 50
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('tasks', TaskSchema);

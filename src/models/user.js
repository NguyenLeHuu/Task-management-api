const mongoose = require('mongoose');
const Task = require('./task');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ['dev', 'PM'],
    default: 'dev',
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task'
  }]
}, {
  timestamps: true,
  autoIndex: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['incomplete', 'completed'],
    default: 'incomplete',
    index:true
  }
}, {
  timestamps: true 
});
taskSchema.index({ status: 1 });
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import User from './user';

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
  },
  assignTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // validate: {
    //   validator: async function(userId) {
    //     const user = await User.findById(userId);
    //     return user !== null;
    //   },
    //   message: 'Assigned user does not exist'
    // }
  }
}
, {
  timestamps: true 
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

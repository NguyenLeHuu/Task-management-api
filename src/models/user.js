const mongoose = require('mongoose');
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
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, {
  timestamps: true,
  autoIndex: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

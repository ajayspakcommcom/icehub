import mongoose, { Schema } from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  taskType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskType',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  assignedTo: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isSubmitted: {
      type: Boolean,
      default: false
    },
    createdDate: {
      type: Date,
      default: null
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  updatedDate: {
    type: Date,
    default: null
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  deletedDate: {
    type: Date,
    default: null
  }
});

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);






import mongoose, { Schema } from 'mongoose';

const userTaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  blogTitle: {
    type: String,
    default: null
  },
  blogParagraph: {
    type: String,
    default: null
  },
  caseStudyTitle: {
    type: String,
    default: null
  },
  csDiagnosis: {
    type: String,
    default: null
  },
  csTreatment: {
    type: String,
    default: null
  },
  csQuestion1: {
    type: String,
    default: null
  },
  csQuestion2: {
    type: String,
    default: null
  },
  csDoctorName: {
    type: String,
    default: null
  },
  videoTitle: {
    type: String,
    default: null
  },
  videoUrl: {
    type: String,
    default: null
  },
  infographicTitle: {
    type: String,
    default: null
  },
  infographic1: {
    type: String,
    default: null
  },
  infographic2: {
    type: String,
    default: null
  },
  infographic3: {
    type: String,
    default: null
  },
  infographic4: {
    type: String,
    default: null
  },
  infographic5: {
    type: String,
    default: null
  },
  infographic6: {
    type: String,
    default: null
  },
  selectedBlog: {
    type: String,
    default: null
  },
  selectedInfographic: {
    type: String,
    default: null
  },
  submitted: {
    type: Boolean,
    default: false
  },
  completionDate: { type: Date, default: null },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }],
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
  },
  approvedByAdmin: {
    type: Boolean,
    default: false
  },
  rejectionReason: {
    type: String,
    default: null
  }
});

userTaskSchema.methods.toggleLike = function (userId: string) {
  const index = this.likes.indexOf(userId);
  if (index === -1) {
    // User hasn't liked the task yet, add like
    this.likes.push(userId);
  } else {
    // User already liked the task, remove like
    this.likes.splice(index, 1);
  }
};

export const UserTask = mongoose.models.UserTask || mongoose.model('UserTask', userTaskSchema);






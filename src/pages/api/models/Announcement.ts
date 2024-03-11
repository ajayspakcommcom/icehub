import mongoose, { Schema } from 'mongoose';

const announcementSchema = new mongoose.Schema({
  heading: {
    type: String,
    default: null,
    required: true
  },
  imgUrl: {
    type: String,
    default: null,
    required: true
  },
  imgLink: {
    type: String,
    default: null,
    required: true
  },
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

export const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);






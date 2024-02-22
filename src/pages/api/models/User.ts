import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    default: null
  },
  city: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  aboutYourSelf: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  specialization: {
    type: String,
    required: true,
    enum: ['Cardiologist', 'Dermatologist', 'Gynecologist', 'Pediatrician', 'Orthopedic Surgeon', 'Neurologist']
  },
  designation: {
    type: String,
    require: true,
    enum: ['Admin', 'User']
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

export const User = mongoose.models.User || mongoose.model('User', userSchema);



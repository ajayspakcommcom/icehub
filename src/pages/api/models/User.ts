import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  // Basic user information
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // Professional details
  profession: {
    type: String,
    required: true,
    enum: ['Doctor', 'Engineer', 'Lawyer', 'Teacher', 'Other']
  },
  experienceYears: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  // Contact information
  phoneNumber: {
    type: String,
    match: [/^\+?\d{10,15}$/, 'Please fill a valid phone number']
  },
  // Date of account creation
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: Date.now
  },
});

// Create a model from the schema
export const User = mongoose.models.User || mongoose.model('User', userSchema);

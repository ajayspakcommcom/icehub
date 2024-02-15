import mongoose, { Schema, models } from 'mongoose';

const addressSchema = new Schema({
  location: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  state: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
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
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Create a model from the schema
export const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);

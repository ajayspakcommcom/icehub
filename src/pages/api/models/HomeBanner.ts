import mongoose, { Schema } from 'mongoose';

const homeBannerSchema = new mongoose.Schema({
  heading: {
    type: String,
    default: null,
    required: true
  },
  paragraph: {
    type: String,
    default: null,
    required: true
  },
  imgUrl: {
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

export const HomeBanner = mongoose.models.HomeBanner || mongoose.model('HomeBanner', homeBannerSchema);





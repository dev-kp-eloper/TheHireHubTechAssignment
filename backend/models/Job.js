import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  openPositions: {
    type: Number,
    required: true
  },
  hiringManager: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  requirements: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Job', jobSchema);

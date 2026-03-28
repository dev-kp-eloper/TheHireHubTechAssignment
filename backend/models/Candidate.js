import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    default: ''
  },
  currentRole: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  resume: {
    type: String,
    default: ''
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  stage: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired', 'Rejected'],
    default: 'Applied'
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: [String],
    default: []
  },
  interviewStatus: {
    type: String,
    enum: ['Pending', 'Scheduled', 'Completed', 'Not Started'],
    default: 'Not Started'
  },
  interviewDate: {
    type: Date,
    default: null
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

export default mongoose.model('Candidate', candidateSchema);

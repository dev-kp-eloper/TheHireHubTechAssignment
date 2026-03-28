import Job from '../models/Job.js';
import Candidate from '../models/Candidate.js';
import { isMockDataMode } from '../config/dataMode.js';
import * as mock from '../data/mockStore.js';

export const getAllJobs = async (req, res) => {
  try {
    if (isMockDataMode()) {
      return res.json(mock.mockGetAllJobs());
    }
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    if (isMockDataMode()) {
      const job = mock.mockGetJobById(req.params.id);
      if (!job) return res.status(404).json({ error: 'Job not found' });
      return res.json(job);
    }
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const candidateCount = await Candidate.countDocuments({ jobId: job._id });
    
    res.json({
      ...job.toObject(),
      totalApplicants: candidateCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    if (isMockDataMode()) {
      const job = mock.mockCreateJob(req.body);
      return res.status(201).json(job);
    }
    const { title, department, location, openPositions, hiringManager, description, requirements } = req.body;
    
    const job = new Job({
      title,
      department,
      location,
      openPositions,
      hiringManager,
      description,
      requirements
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    if (isMockDataMode()) {
      const job = mock.mockUpdateJob(req.params.id, req.body);
      if (!job) return res.status(404).json({ error: 'Job not found' });
      return res.json(job);
    }
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    if (isMockDataMode()) {
      const ok = mock.mockDeleteJob(req.params.id);
      if (!ok) return res.status(404).json({ error: 'Job not found' });
      return res.json({ message: 'Job deleted' });
    }
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    
    // also remove all candidates linked to this job
    await Candidate.deleteMany({ jobId: req.params.id });
    
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

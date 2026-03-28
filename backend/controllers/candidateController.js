import Candidate from '../models/Candidate.js';

export const getAllCandidates = async (req, res) => {
  try {
    const { stage, minExperience, maxExperience, minScore, maxScore, search } = req.query;

    let query = {};

    if (stage && stage !== 'All') {
      query.stage = stage;
    }

    if (minExperience) {
      query.experience = { $gte: parseInt(minExperience) };
    }
    if (maxExperience) {
      query.experience = { ...query.experience, $lte: parseInt(maxExperience) };
    }

    if (minScore) {
      query.matchScore = { $gte: parseInt(minScore) };
    }
    if (maxScore) {
      query.matchScore = { ...query.matchScore, $lte: parseInt(maxScore) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const candidates = await Candidate.find(query).populate('jobId').sort({ lastActivity: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCandidatesByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { stage, minExperience, maxExperience, minScore, maxScore, search } = req.query;

    let query = { jobId };

    if (stage && stage !== 'All') {
      query.stage = stage;
    }

    if (minExperience) {
      query.experience = { $gte: parseInt(minExperience) };
    }
    if (maxExperience) {
      query.experience = { ...query.experience, $lte: parseInt(maxExperience) };
    }

    if (minScore) {
      query.matchScore = { $gte: parseInt(minScore) };
    }
    if (maxScore) {
      query.matchScore = { ...query.matchScore, $lte: parseInt(maxScore) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const candidates = await Candidate.find(query).sort({ lastActivity: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCandidate = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      currentRole,
      company,
      experience,
      skills,
      resume,
      jobId,
      matchScore
    } = req.body;

    const candidate = new Candidate({
      name,
      email,
      phone,
      currentRole,
      company,
      experience,
      skills,
      resume,
      jobId,
      matchScore,
      lastActivity: new Date()
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      lastActivity: new Date()
    };

    const candidate = await Candidate.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCandidateStage = async (req, res) => {
  try {
    const { stage } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { stage, lastActivity: new Date() },
      { new: true }
    );

    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addNote = async (req, res) => {
  try {
    const { note } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { 
        $push: { notes: note },
        lastActivity: new Date()
      },
      { new: true }
    );

    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    res.json({ message: 'Candidate deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCandidatesByStage = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const stages = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];
    const result = {};

    for (const stage of stages) {
      const candidates = await Candidate.find({ jobId, stage }).sort({ lastActivity: -1 });
      result[stage] = candidates;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCandidateStats = async (req, res) => {
  try {
    const { jobId } = req.params;

    const stats = await Candidate.aggregate([
      { $match: { jobId: new (require('mongoose')).Types.ObjectId(jobId) } },
      {
        $group: {
          _id: '$stage',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import express from 'express';
import {
  getAllCandidates,
  getCandidatesByJob,
  getCandidateById,
  createCandidate,
  updateCandidate,
  updateCandidateStage,
  addNote,
  deleteCandidate,
  getCandidatesByStage,
  getCandidateStats
} from '../controllers/candidateController.js';

const router = express.Router();

router.get('/', getAllCandidates);
router.get('/job/:jobId', getCandidatesByJob);
router.get('/job/:jobId/stages', getCandidatesByStage);
router.get('/job/:jobId/stats', getCandidateStats);
router.get('/:id', getCandidateById);
router.post('/', createCandidate);
router.put('/:id', updateCandidate);
router.patch('/:id/stage', updateCandidateStage);
router.post('/:id/notes', addNote);
router.delete('/:id', deleteCandidate);

export default router;

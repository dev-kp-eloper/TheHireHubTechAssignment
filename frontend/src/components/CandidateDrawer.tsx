import { useState } from 'react';
import { FiX, FiSave, FiTrash2 } from 'react-icons/fi';
import { candidateAPI } from '../utils/api';
import { Candidate } from '../utils/types';

interface CandidateDrawerProps {
  candidate: Candidate;
  onClose: () => void;
  onUpdate: (candidate: Candidate) => void;
  onDelete: (candidateId: string) => void;
}

export default function CandidateDrawer({
  candidate,
  onClose,
  onUpdate,
  onDelete
}: CandidateDrawerProps) {
  const [formData, setFormData] = useState({
    stage: candidate.stage,
    interviewStatus: candidate.interviewStatus,
    interviewDate: candidate.interviewDate || '',
    notes: ''
  });
  const [newNote, setNewNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await candidateAPI.update(candidate._id, {
        stage: formData.stage,
        interviewStatus: formData.interviewStatus,
        interviewDate: formData.interviewDate
      });
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating candidate:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    try {
      const response = await candidateAPI.addNote(candidate._id, newNote);
      onUpdate(response.data);
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    
    try {
      setDeleting(true);
      await candidateAPI.delete(candidate._id);
      onDelete(candidate._id);
      onClose();
    } catch (error) {
      console.error('Error deleting candidate:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Candidate Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Candidate Info */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{candidate.name}</h3>
            <p className="text-gray-600 text-sm">{candidate.email}</p>
            <p className="text-gray-600 text-sm">{candidate.phone}</p>
          </div>

          {/* Current Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase">Current Role</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.currentRole}</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase">Company</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.company}</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase">Experience</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.experience} years</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase">Match Score</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.matchScore}%</p>
            </div>
          </div>

          {/* Skills */}
          {candidate.skills.length > 0 && (
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stage */}
          <div>
            <label className="text-gray-600 text-xs font-semibold uppercase">Pipeline Stage</label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Offered">Offered</option>
              <option value="Hired">Hired</option>
            </select>
          </div>

          {/* Interview Status */}
          <div>
            <label className="text-gray-600 text-xs font-semibold uppercase">Interview Status</label>
            <select
              value={formData.interviewStatus}
              onChange={(e) => setFormData({ ...formData, interviewStatus: e.target.value as any })}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Not Started">Not Started</option>
              <option value="Pending">Pending</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Interview Date */}
          <div>
            <label className="text-gray-600 text-xs font-semibold uppercase">Interview Date</label>
            <input
              type="datetime-local"
              value={formData.interviewDate}
              onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes Section */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 text-xs font-semibold uppercase mb-3">Notes</p>
            
            {/* Add Note */}
            <div className="space-y-2 mb-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={2}
              ></textarea>
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
              >
                Add Note
              </button>
            </div>

            {/* Notes List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {candidate.notes.length === 0 ? (
                <p className="text-gray-500 text-sm">No notes yet</p>
              ) : (
                candidate.notes.map((note, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-gray-700 text-sm">{note}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 pt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              <FiSave size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

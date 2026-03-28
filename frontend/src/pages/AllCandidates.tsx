import { useState, useEffect } from 'react';
import { candidateAPI } from '../utils/api';
import { Candidate } from '../utils/types';
import CandidateDrawer from '../components/CandidateDrawer';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

export default function AllCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    stage: '',
    search: '',
    minScore: '',
  });

  useEffect(() => {
    loadAllCandidates();
  }, [filters]);

  const loadAllCandidates = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filters.stage) params.stage = filters.stage;
      if (filters.search) params.search = filters.search;
      if (filters.minScore) params.minScore = filters.minScore;

      const response = await candidateAPI.getAll(params);
      setCandidates(response.data);
    } catch (error) {
      console.error('Error loading candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCandidateUpdate = (updatedCandidate: Candidate) => {
    setSelectedCandidate(updatedCandidate);
    setCandidates(candidates.map(c => c._id === updatedCandidate._id ? updatedCandidate : c));
  };

  const handleCandidateDelete = (candidateId: string) => {
    setCandidates(candidates.filter(c => c._id !== candidateId));
    setSelectedCandidate(null);
  };

  const clearFilters = () => {
    setFilters({ stage: '', search: '', minScore: '' });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  const stageStats = {
    Applied: candidates.filter(c => c.stage === 'Applied').length,
    Shortlisted: candidates.filter(c => c.stage === 'Shortlisted').length,
    Interview: candidates.filter(c => c.stage === 'Interview').length,
    Offered: candidates.filter(c => c.stage === 'Offered').length,
    Hired: candidates.filter(c => c.stage === 'Hired').length,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Candidates</h1>
          <p className="text-gray-600">Browse and manage all candidates across all positions</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-sm font-medium">Total</p>
            <p className="text-3xl font-bold text-gray-900">{candidates.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-sm font-medium">Applied</p>
            <p className="text-3xl font-bold text-blue-600">{stageStats.Applied}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-sm font-medium">Shortlisted</p>
            <p className="text-3xl font-bold text-yellow-600">{stageStats.Shortlisted}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-sm font-medium">Interview</p>
            <p className="text-3xl font-bold text-purple-600">{stageStats.Interview}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-sm font-medium">Hired</p>
            <p className="text-3xl font-bold text-green-600">{stageStats.Hired}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Filters
              <FiChevronDown size={18} className={`transition ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={filters.stage}
                  onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Stages</option>
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Offered">Offered</option>
                  <option value="Hired">Hired</option>
                </select>

                <select
                  value={filters.minScore}
                  onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Min Score</option>
                  <option value="0">0+</option>
                  <option value="25">25+</option>
                  <option value="50">50+</option>
                  <option value="75">75+</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Candidates List */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : candidates.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No candidates found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Current Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Experience</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Score</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate._id}
                      onClick={() => setSelectedCandidate(candidate)}
                      className="hover:bg-gray-50 cursor-pointer transition"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{candidate.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{candidate.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{candidate.currentRole}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{candidate.experience}y</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${candidate.matchScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{candidate.matchScore}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          candidate.stage === 'Hired' ? 'bg-green-100 text-green-800' :
                          candidate.stage === 'Offered' ? 'bg-blue-100 text-blue-800' :
                          candidate.stage === 'Interview' ? 'bg-purple-100 text-purple-800' :
                          candidate.stage === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {candidate.stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Candidate Drawer */}
      {selectedCandidate && (
        <CandidateDrawer
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onUpdate={handleCandidateUpdate}
          onDelete={handleCandidateDelete}
        />
      )}
    </div>
  );
}

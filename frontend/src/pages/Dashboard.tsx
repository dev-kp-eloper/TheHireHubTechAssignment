import { useState, useEffect } from 'react';
import { candidateAPI } from '../utils/api';
import { Candidate, Job } from '../utils/types';
import JobOverview from '../components/JobOverview';
import CandidatePipeline from '../components/CandidatePipeline';
import CandidateDrawer from '../components/CandidateDrawer';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

interface DashboardProps {
  jobId: string;
  job?: Job;
}

export default function Dashboard({ jobId, job }: DashboardProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    stage: '',
    search: '',
    minExperience: '',
    maxExperience: '',
    minScore: '',
    maxScore: ''
  });

  useEffect(() => {
    loadCandidates();
  }, [jobId, filters]);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filters.stage) params.stage = filters.stage;
      if (filters.search) params.search = filters.search;
      if (filters.minExperience) params.minExperience = filters.minExperience;
      if (filters.maxExperience) params.maxExperience = filters.maxExperience;
      if (filters.minScore) params.minScore = filters.minScore;
      if (filters.maxScore) params.maxScore = filters.maxScore;

      const response = await candidateAPI.getByJob(jobId, params);
      setCandidates(response.data);
    } catch (error) {
      console.error('Error loading candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCandidateUpdate = async (updatedCandidate: Candidate) => {
    setSelectedCandidate(updatedCandidate);
    setCandidates(candidates.map(c => c._id === updatedCandidate._id ? updatedCandidate : c));
  };

  const handleCandidateDelete = async (candidateId: string) => {
    setCandidates(candidates.filter(c => c._id !== candidateId));
    setSelectedCandidate(null);
  };

  const clearFilters = () => {
    setFilters({
      stage: '',
      search: '',
      minExperience: '',
      maxExperience: '',
      minScore: '',
      maxScore: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb and Title */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center text-sm text-gray-600 mb-3">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{job?.title || 'Loading...'}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{job?.title || 'Job Position'}</h1>
          <p className="text-gray-600 text-sm mt-1">{job?.department} • {job?.location}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Job Overview */}
        {job && <JobOverview job={job} candidateCount={candidates.length} />}

        {/* Search Bar (Always Visible) */}
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

          {/* Advanced Filters (Collapsible) */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                <input
                  type="number"
                  placeholder="Min Experience"
                  value={filters.minExperience}
                  onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="number"
                  placeholder="Max Experience"
                  value={filters.maxExperience}
                  onChange={(e) => setFilters({ ...filters, maxExperience: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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

        {/* Candidate Pipeline */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : candidates.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No candidates found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <CandidatePipeline 
            candidates={candidates} 
            onSelectCandidate={setSelectedCandidate}
          />
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

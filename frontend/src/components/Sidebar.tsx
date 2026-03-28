import { 
  FiBriefcase, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiChevronRight
} from 'react-icons/fi';
import { Job } from '../utils/types';

interface SidebarProps {
  jobs: Job[];
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onClose?: () => void;
  onAllCandidates: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

export default function Sidebar({ 
  jobs, 
  selectedJobId, 
  onSelectJob, 
  onClose,
  onAllCandidates,
  onSettings,
  onLogout 
}: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FiBriefcase className="text-blue-600" size={24} />
          Recruitment
        </h1>
        <p className="text-xs text-gray-500 mt-1">Pipeline Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="mb-6">
          <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Open Positions
          </p>
          <div className="space-y-2 mt-3">
            {jobs.length === 0 ? (
              <p className="px-3 py-2 text-sm text-gray-500">No jobs available</p>
            ) : (
              jobs.map(job => (
                <button
                  key={job._id}
                  onClick={() => {
                    onSelectJob(job._id);
                    onClose?.();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${
                    selectedJobId === job._id
                      ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="truncate">{job.title}</span>
                  {selectedJobId === job._id && (
                    <FiChevronRight className="flex-shrink-0" size={18} />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="h-px bg-gray-200 my-4"></div>

        {/* Quick Links */}
        <div className="space-y-2">
          <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quick Links
          </p>
          <button 
            onClick={() => {
              onAllCandidates();
              onClose?.();
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition"
          >
            <FiUsers size={18} />
            All Candidates
          </button>
          <button 
            onClick={() => {
              onSettings();
              onClose?.();
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition"
          >
            <FiSettings size={18} />
            Settings
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button 
          onClick={() => {
            onLogout();
            onClose?.();
          }}
          className="w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition font-medium"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

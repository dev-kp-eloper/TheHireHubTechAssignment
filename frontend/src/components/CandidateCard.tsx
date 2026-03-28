import { FiTrendingUp, FiClock } from 'react-icons/fi';
import { Candidate } from '../utils/types';

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
}

export default function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLastActivityText = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:bg-white transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600">
            {candidate.name}
          </h3>
          <p className="text-gray-500 text-xs truncate">{candidate.company}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          <FiTrendingUp size={14} className={getScoreColor(candidate.matchScore)} />
          <span className={`text-sm font-bold ${getScoreColor(candidate.matchScore)}`}>
            {candidate.matchScore}%
          </span>
        </div>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <FiClock size={12} />
          {getLastActivityText(candidate.lastActivity)}
        </span>
      </div>

      {candidate.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {candidate.skills.slice(0, 2).map((skill, idx) => (
            <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 2 && (
            <span className="text-xs text-gray-500">+{candidate.skills.length - 2}</span>
          )}
        </div>
      )}
    </div>
  );
}

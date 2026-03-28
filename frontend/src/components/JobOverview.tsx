import { FiBriefcase, FiMapPin, FiUsers, FiUser } from 'react-icons/fi';
import { Job } from '../utils/types';

interface JobOverviewProps {
  job: Job;
  candidateCount: number;
}

export default function JobOverview({ job, candidateCount }: JobOverviewProps) {
  const stats = [
    {
      label: 'Open Positions',
      value: job.openPositions,
      icon: FiBriefcase,
      color: 'blue'
    },
    {
      label: 'Location',
      value: job.location,
      icon: FiMapPin,
      color: 'green'
    },
    {
      label: 'Department',
      value: job.department,
      icon: FiUsers,
      color: 'purple'
    },
    {
      label: 'Total Applicants',
      value: candidateCount,
      icon: FiUser,
      color: 'orange'
    },
    {
      label: 'Hiring Manager',
      value: job.hiringManager,
      icon: FiUser,
      color: 'red'
    }
  ];

  const colorStyles: any = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        const bgColor = (colorStyles as any)[stat.color];
        
        return (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${bgColor}`}>
              <Icon size={24} />
            </div>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2 truncate">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}

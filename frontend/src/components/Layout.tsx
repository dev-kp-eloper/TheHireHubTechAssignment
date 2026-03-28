import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Job } from '../utils/types';

interface LayoutProps {
  children: React.ReactNode;
  jobs: Job[];
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onLogout: () => void;
  onAllCandidates: () => void;
  onSettings: () => void;
  user?: any;
}

export default function Layout({ 
  children, 
  jobs, 
  selectedJobId, 
  onSelectJob, 
  onLogout,
  onAllCandidates,
  onSettings,
  user 
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
        <Sidebar
          jobs={jobs}
          selectedJobId={selectedJobId}
          onSelectJob={onSelectJob}
          onClose={() => setSidebarOpen(false)}
          onAllCandidates={onAllCandidates}
          onSettings={onSettings}
          onLogout={onLogout}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          menuOpen={sidebarOpen}
          onLogout={onLogout}
          user={user}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { jobAPI } from './utils/api';
import { Job } from './utils/types';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AllCandidates from './pages/AllCandidates';
import Settings from './pages/Settings';
import Login from './components/Login';
import './styles/index.css';

function App() {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'candidates' | 'settings'>('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        loadJobs();
      } catch (error) {
        console.error('Error parsing stored user:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getAll();
      setJobs(response.data);
      if (response.data.length > 0) {
        setSelectedJobId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    loadJobs();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setJobs([]);
    setSelectedJobId('');
    setCurrentPage('dashboard');
  };

  if (!user) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  if (loading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      jobs={jobs} 
      selectedJobId={selectedJobId} 
      onSelectJob={(jobId: string) => {
        setSelectedJobId(jobId);
        setCurrentPage('dashboard');
      }} 
      onLogout={handleLogout} 
      onAllCandidates={() => setCurrentPage('candidates')}
      onSettings={() => setCurrentPage('settings')}
      user={user}
    >
      {currentPage === 'dashboard' ? (
        selectedJobId ? (
          <Dashboard jobId={selectedJobId} job={jobs.find(j => j._id === selectedJobId)} />
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-gray-500 text-lg">No jobs available</p>
          </div>
        )
      ) : currentPage === 'candidates' ? (
        <AllCandidates />
      ) : (
        <Settings />
      )}
    </Layout>
  );
}

export default App;

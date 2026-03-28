import { FiMenu, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

interface NavbarProps {
  onMenuClick: () => void;
  menuOpen: boolean;
  onLogout: () => void;
  user?: any;
}

export default function Navbar({ onMenuClick, menuOpen, onLogout, user }: NavbarProps) {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle menu"
        >
          <FiMenu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            H
          </div>
          <span className="font-bold text-lg text-gray-900">TheHireHub</span>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setShowLogout(!showLogout)}
          className="hidden sm:flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="text-sm text-left">
            <p className="font-medium text-gray-900">{user?.name || 'Admin'}</p>
            <p className="text-gray-500 text-xs">Recruiter</p>
          </div>
        </button>

        {/* Logout Dropdown */}
        {showLogout && (
          <div className="absolute top-14 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-48">
            <div className="px-3 py-2 border-b border-gray-200 mb-2">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'admin@thehirehub.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

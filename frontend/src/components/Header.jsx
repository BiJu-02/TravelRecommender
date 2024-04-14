import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { logout } from '../utils/auth';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate('/login');
  };

  const handleRecommend = () => {
    navigate('/preference');
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <nav>
          <button
            onClick={handleRecommend}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
          >
            Recommend
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
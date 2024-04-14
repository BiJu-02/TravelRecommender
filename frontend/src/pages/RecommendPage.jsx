import React from 'react';
import Header from '../components/Header';
import RecomCard from '../components/RecomCard';
import { useNavigate } from 'react-router-dom';

const RecommendPage = () => {
  const navigate = useNavigate();

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div>
      <Header>
        <button
          onClick={handleBackToLanding}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Landing
        </button>
      </Header>
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Preferences</h2>
        <RecomCard />
      </div>
    </div>
  );
};

export default RecommendPage;
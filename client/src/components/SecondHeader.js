import React from 'react';
import { useNavigate } from 'react-router-dom';

const SecondHeader = () => {
  const navigate = useNavigate();

  const handleGoToSecondPage = () => {
    navigate('/second-page');
  };

  return (
    <div className="text-center my-8">
      <div className="mt-4">
        <img src="/logo192.png" alt="Small Logo" className="w-12 h-12 mx-auto" />
        <h1 className="text-4xl font-bold mt-2">Your Project Title</h1>
        <p className="text-gray-600 text-sm mt-2">Your project description goes here.</p>
        <button className="btn-primary" onClick={handleGoToSecondPage}>
          Go to Second Page
        </button>
      </div>
    </div>
  );
};

export default SecondHeader;
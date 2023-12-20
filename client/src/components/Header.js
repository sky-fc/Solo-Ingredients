import React from 'react';

const Header = () => {
  return (
    <div className="text-center my-8">
      <img src="/path/to/your/small-logo.png" alt="Small Logo" className="w-12 h-12 mx-auto" />
      <h1 className="text-4xl font-bold mt-2">Your Project Title</h1>
      <p className="text-gray-600 text-sm mt-2">Your project description goes here.</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4">Go to Second Page</button>
    </div>
  );
};

export default Header;
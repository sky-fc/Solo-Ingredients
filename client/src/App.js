import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function Home() {
  return <div className="bg-blue-500 text-white p-4">Welcome to the Home Page!</div>;
}

function About() {
  return <div className="bg-green-500 text-white p-4">Learn more about us here.</div>;
}

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
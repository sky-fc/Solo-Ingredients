import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SecondPage from './components/SecondPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App;

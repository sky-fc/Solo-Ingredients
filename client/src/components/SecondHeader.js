import React from "react";
import { useNavigate } from "react-router-dom";

const SecondHeader = () => {
  const navigate = useNavigate();

  // Function to handle the 'Create' button click
  const handleCreate = () => {
    // Add the functionality for 'Create' button here
    console.log("Create button clicked");
  };

  // Function to handle the 'Upload' button click
  const handleUpload = () => {
    // Add the functionality for 'Upload' button here
    console.log("Upload button clicked");
  };

  // Function to handle the search bar input
  const handleSearch = (event) => {
    // Add the functionality for search bar here
    console.log("Search:", event.target.value);
  };

  return (
    <div className="text-center my-8">
      <div className="mt-4">
        <img
          src="/logo192.png"
          alt="Small Logo"
          className="w-12 h-12 mx-auto"
        />
        <h1 className="text-4xl font-bold mt-2">Your Project Title</h1>
        <p className="text-gray-600 text-sm mt-2">
          Your project description goes here.
        </p>

        {/* 'Create' button */}
        <button className="btn-primary mr-4" onClick={handleCreate}>
          Create
        </button>

        {/* 'Upload' button */}
        <button className="btn-primary mr-4" onClick={handleUpload}>
          Upload
        </button>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-2 py-1"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SecondHeader;

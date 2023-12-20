import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SecondHeader = ({ onUpload }) => {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to handle the 'Create' button click
  const handleCreate = () => {
    // Add the functionality for 'Create' button here
    console.log("Create button clicked");
  };

  // Function to handle the 'Upload' button click
  const handleUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files);

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    onUpload(newImages);
    console.log("Upload button clicked");
  };

  // Function to handle the search bar input
  const handleSearch = (event) => {
    // Add the functionality for the search bar here
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
        <label className="btn-primary mr-4">
          Upload
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>

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

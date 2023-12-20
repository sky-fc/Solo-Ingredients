import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SecondHeader = ({ onUpload, onCreateAlbum }) => {
  const navigate = useNavigate();

  const handleCreate = () => {
    const albumName = prompt('Enter the name of the album:');
    if (albumName) {
      onCreateAlbum(albumName);
    }
  };

  const handleUpload = (event) => {
    // Input type file is needed to access the files property
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    // Trigger input click when the button is clicked
    input.click();

    // Handle the file selection
    input.addEventListener('change', (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        const fileArray = Array.from(files);
        onUpload(fileArray);
      }
    });
  };

  const handleSearch = (event) => {
    console.log('Search:', event.target.value);
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

        <button className="btn-primary mr-4" onClick={handleCreate}>
          Create
        </button>

        <button className="btn-primary mr-4" onClick={handleUpload}>
          Upload
        </button>

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

import React, { useState } from 'react';
import SecondHeader from './SecondHeader';

const SecondPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // Function to handle image upload
  const handleUpload = (newImages) => {
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Function to handle image deletion
  const handleDelete = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <div>
      <SecondHeader onUpload={handleUpload} />
      {/* Display uploaded images */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.data}
              alt={`Uploaded Image ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondPage;

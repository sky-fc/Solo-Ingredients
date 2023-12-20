import React, { useState } from 'react';
import SecondHeader from './SecondHeader';

const SecondPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // Function to handle image upload
  const handleUpload = (newImages) => {
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <div>
      <SecondHeader onUpload={handleUpload} />
      {/* Display uploaded images */}
      <div className="mt-4">
        {uploadedImages.map((image, index) => (
          <img
            key={index}
            src={image.data}
            alt={`Uploaded Image ${index + 1}`}
            className="w-48 h-48 object-cover m-2"
          />
        ))}
      </div>
    </div>
  );
};

export default SecondPage;


import React, { useState, useEffect } from "react";
import SecondHeader from "./SecondHeader";

const SecondPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // Load images from localStorage on component mount
  useEffect(() => {
    const storedImages =
      JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setUploadedImages(storedImages);
  }, []);

  const handleUpload = (newImages) => {
    const updatedImages = [...uploadedImages, ...newImages].sort(
      (a, b) => b.file.lastModified - a.file.lastModified
    );

    // Save images to localStorage
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

    setUploadedImages(updatedImages);
  };

  return (
    <div>
      <SecondHeader onUpload={handleUpload} />

      {/* Display uploaded images */}
      <div className="mt-4">
        {uploadedImages.map((image, index) => (
          <div key={index}>
            <img
              src={image.objectURL}
              alt={`Uploaded Image ${index + 1}`}
              className="w-48 h-48 object-cover m-2"
            />
            <p>Upload Date: {image.uploadDate.toString()}</p>
          </div>
        ))}
      </div>

      {/* Other content on the SecondPage goes here */}
    </div>
  );
};

export default SecondPage;

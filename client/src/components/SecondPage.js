import React, { useState } from "react";
import SecondHeader from "./SecondHeader";

const SecondPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = (newImages) => {
    setUploadedImages((prevImages) =>
      [...prevImages, ...newImages].sort(
        (a, b) => b.lastModified - a.lastModified
      )
    );
  };

  return (
    <div>
      <SecondHeader onUpload={handleUpload} />

      {/* Display uploaded images */}
      <div className="mt-4">
        {uploadedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Uploaded Image ${index + 1}`}
            className="w-48 h-auto object-cover m-2"
          />
        ))}
      </div>

      {/* Other content on the SecondPage goes here */}
    </div>
  );
};

export default SecondPage;

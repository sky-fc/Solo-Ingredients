import React, { useState, useEffect } from "react";
import SecondHeader from "./SecondHeader";

const SecondPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [albums, setAlbums] = useState([]);

  // Load images and albums from localStorage on component mount
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    const storedAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    setUploadedImages(storedImages);
    setAlbums(storedAlbums);
  }, []);

  const handleUpload = (newImages) => {
    // Ensure newImages is not undefined
    newImages = newImages || [];
  
    const updatedImages = [...uploadedImages, ...newImages].sort(
      (a, b) => (b.file ? b.file.lastModified : 0) - (a.file ? a.file.lastModified : 0)
    );
  
    // Save images to localStorage
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
  
    setUploadedImages(updatedImages);
  };

  const handleCreateAlbum = (albumName) => {
    const newAlbum = {
      id: new Date().getTime(), // Using timestamp as a unique identifier
      name: albumName,
      uploadDate: new Date(),
      images: [],
    };

    setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);

    // Save albums to localStorage
    localStorage.setItem("albums", JSON.stringify([...albums, newAlbum]));
  };

  return (
    <div>
      <SecondHeader onUpload={handleUpload} onCreateAlbum={handleCreateAlbum} />

      {/* Display uploaded images */}
<div className="mt-4">
  {uploadedImages.map((image, index) => (
    <div key={index}>
      <img
        src={image.objectURL}
        alt={`Uploaded Image ${index + 1}`}
        className="w-48 h-48 object-cover m-2"
      />
      <p>Upload Date: {image.uploadDate ? image.uploadDate.toString() : 'N/A'}</p>
    </div>
  ))}
</div>

      {/* Display albums */}
      <div className="mt-4">
        {albums.map((album, index) => (
          <div key={index} className="border p-2 mb-2">
            <h2 className="text-lg font-bold">{album.name}</h2>
            <p className="text-sm text-gray-600">Uploaded on {album.date}</p>
          </div>
        ))}
      </div>

      {/* Other content on the SecondPage goes here */}
    </div>
  );
};

export default SecondPage;

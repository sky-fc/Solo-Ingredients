import React, { useState, useEffect } from 'react';

const ImageGrid = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/images.json'); // Assuming you have a JSON file listing image names
        const data = await response.json();
        setImageList(data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {imageList.map((image, index) => (
        <img
          key={index}
          src={`/images/${image}`}
          alt={`Image ${index + 1}`}
          className="w-full h-auto object-cover"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
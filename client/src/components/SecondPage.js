import React, { useState } from "react";
import SecondHeader from "./SecondHeader";
import Modal from "react-modal";

const SecondPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle image upload
  const handleUpload = (newImages) => {
    const imagesWithInfo = newImages.map((image) => {
      const name = prompt("Enter the name of the image:");
      const description = prompt("Enter the description of the image:");
      const tags = prompt("Enter tags for the image (comma-separated):");

      return {
        file: image.file,
        data: image.data,
        name,
        description,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      };
    });

    setUploadedImages((prevImages) => [...prevImages, ...imagesWithInfo]);
  };

  // Function to handle image deletion
  const handleDelete = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  // Function to open modal and set the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
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
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => openModal(image)}
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

      {/* Image Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Image"
      >
        {selectedImage && (
          <div>
            <img
              src={selectedImage.data}
              alt="Selected Image"
              className="w-1/2 mx-auto"
            />
            <p className="mt-2">Name: {selectedImage.name}</p>
            <p>Description: {selectedImage.description}</p>
            <p>Tags: {selectedImage.tags.join(", ")}</p>
            {/* Add more information as needed */}
          </div>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SecondPage;

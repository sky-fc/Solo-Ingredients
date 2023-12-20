import React, { useState } from "react";
import SecondHeader from "./SecondHeader";
import Modal from "react-modal";

const SecondPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedImageInfo, setEditedImageInfo] = useState(null);


  // Function to handle image upload
  const handleUpload = (newImages) => {
    const imagesWithInfo = newImages.map((image) => {
      const name = prompt('Enter the name of the image:');
      const description = prompt('Enter the description of the image:');
      const tags = prompt('Enter tags for the image (comma-separated):');

      return {
        file: image.file,
        data: image.data,
        name,
        description,
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
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

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedImageInfo({
      name: selectedImage.name,
      description: selectedImage.description,
      tags: selectedImage.tags ? (Array.isArray(selectedImage.tags) ? selectedImage.tags.join(', ') : '') : '',


    });
    
  };

  const handleSaveEdit = () => {
    setUploadedImages((prevImages) =>
      prevImages.map((image) =>
        image === selectedImage
          ? { ...image, ...editedImageInfo, tags: editedImageInfo.tags.split(',').map((tag) => tag.trim()) }
          : image
      )
    );
    setSelectedImage((prevImage) => ({ ...prevImage, ...editedImageInfo }));
    setIsEditMode(false);
  };

  const handleEditChange = (field, value) => {
    setEditedImageInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  return (
    <div>
      <SecondHeader onUpload={handleUpload} />
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
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Selected Image">
        {selectedImage && (
          <div>
            <img src={selectedImage.data} alt="Selected Image" className="w-1/2 mx-auto" />
            {isEditMode ? (
              <>
                <label className="block mt-4">Name:</label>
                <input
                  type="text"
                  value={editedImageInfo.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <label className="block mt-2">Description:</label>
                <input
                  type="text"
                  value={editedImageInfo.description}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <label className="block mt-2">Tags (comma-separated):</label>
                <input
                  type="text"
                  value={editedImageInfo.tags}
                  onChange={(e) => handleEditChange('tags', e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="mt-2">Name: {selectedImage.name}</p>
                <p>Description: {selectedImage.description}</p>
                <p>Tags: {selectedImage.tags ? selectedImage.tags.join(', ') : ''}</p>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </>
            )}
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
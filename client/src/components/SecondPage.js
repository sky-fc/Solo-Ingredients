import React, { useState } from "react";
import SecondHeader from "./SecondHeader";
import Modal from "react-modal";

const SecondPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedImageInfo, setEditedImageInfo] = useState({
    name: "",
    description: "",
    tags: [],
  });
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [tagsError, setTagsError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpload = (newImages) => {
    const imagesWithInfo = newImages.map((image) => {
      const name = prompt("Enter the name of the image:");
      const description = prompt("Enter the description of the image:");
      const tags = prompt("Enter tags for the image (comma-separated):");

      const imageInfo = {
        file: image.file,
        data: image.data,
        name: name && name.length <= 255 ? name : "",
        description:
          description && description.length <= 255 ? description : "",
        tags: tags
          ? tags.length <= 255
            ? tags.split(",").map((tag) => tag.trim())
            : []
          : [],
      };

      if (!validateImageInfo(imageInfo)) {
        console.error("Invalid image information. Please check the input.");
        return null;
      }

      return imageInfo;
    });

    const filteredImages = imagesWithInfo.filter((image) => image !== null);

    setUploadedImages((prevImages) => [...prevImages, ...filteredImages]);
  };

  const handleDelete = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedImageInfo({
      name: selectedImage.name,
      description: selectedImage.description,
      tags: selectedImage.tags ? selectedImage.tags : [],
    });
  };

  const handleSaveEdit = () => {
    if (!validateImageInfo(editedImageInfo)) {
      console.error("Invalid image information. Please check the input.");
      return;
    }

    setUploadedImages((prevImages) =>
      prevImages.map((image) =>
        image === selectedImage
          ? {
              ...image,
              ...editedImageInfo,
              tags: editedImageInfo.tags
                ? editedImageInfo.tags.split(",").map((tag) => tag.trim())
                : [],
            }
          : image
      )
    );

    setSelectedImage((prevImage) => ({ ...prevImage, ...editedImageInfo }));
    setIsEditMode(false);
  };

  const handleEditChange = (field, value) => {
    setEditedImageInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  const validateImageInfo = (imageInfo) => {
    const { name, description, tags } = imageInfo;
    let isValid = true;

    if (!name || name.length > 255) {
      setNameError(
        "Name, description, and tags are required and must be 255 characters or less."
      );
      isValid = false;
    } else {
      setNameError("");
    }

    if (description && description.length > 255) {
      setDescriptionError(
        "Name, description, and tags are required and must be 255 characters or less."
      );
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (tags && typeof tags === "string") {
      const tagsArray = tags.split(",").map((tag) => tag.trim());
      if (tagsArray.some((tag) => tag.length > 255)) {
        setTagsError(
          "Name, description, and tags are required and must be 255 characters or less."
        );
        isValid = false;
      } else {
        setTagsError("");
      }
    }

    return isValid;
  };

  const handleSearch = () => {
    // Perform the search based on the query
    // You can modify this part to filter images as needed
    const filteredImages = uploadedImages.filter((image) => {
      const { name, description, tags } = image;

      return (
        name.toLowerCase().includes(searchQuery) ||
        description.toLowerCase().includes(searchQuery) ||
        (tags && tags.join(", ").toLowerCase().includes(searchQuery))
      );
    });

    // Update the state with the filtered images
    setUploadedImages(filteredImages);
  };

  return (
    <div>
      <SecondHeader
        onUpload={handleUpload}
        onSearch={handleSearch}
        setSearchQuery={setSearchQuery}
      />
      {nameError && <p className="text-red-500">{nameError}</p>}
      {descriptionError && <p className="text-red-500">{descriptionError}</p>}
      {tagsError && <p className="text-red-500">{tagsError}</p>}
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
            {isEditMode ? (
              <>
                <label className="block mt-4">Name:</label>
                <input
                  type="text"
                  value={editedImageInfo.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <label className="block mt-2">Description:</label>
                <input
                  type="text"
                  value={editedImageInfo.description}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                  className="border rounded px-2 py-1"
                />
                <label className="block mt-2">Tags (comma-separated):</label>
                <input
                  type="text"
                  value={editedImageInfo.tags.join(", ")}
                  onChange={(e) => handleEditChange("tags", e.target.value)}
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
                <p>
                  Tags:{" "}
                  {selectedImage.tags ? selectedImage.tags.join(", ") : ""}
                </p>

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

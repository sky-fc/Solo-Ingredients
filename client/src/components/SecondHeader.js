// import React from "react";
// import { useNavigate } from "react-router-dom";

// const SecondHeader = () => {
//   const navigate = useNavigate();

//   // Function to handle the 'Create' button click
//   const handleCreate = () => {
//     // Add the functionality for 'Create' button here
//     console.log("Create button clicked");
//   };

//   // Function to handle the 'Upload' button click
//   const handleUpload = () => {
//     // Add the functionality for 'Upload' button here
//     console.log("Upload button clicked");
//   };

//   // Function to handle the search bar input
//   const handleSearch = (event) => {
//     // Add the functionality for search bar here
//     console.log("Search:", event.target.value);
//   };

//   return (
//     <div className="text-center my-8">
//       <div className="mt-4">
//         <img
//           src="/logo192.png"
//           alt="Small Logo"
//           className="w-12 h-12 mx-auto"
//         />
//         <h1 className="text-4xl font-bold mt-2">Your Project Title</h1>
//         <p className="text-gray-600 text-sm mt-2">
//           Your project description goes here.
//         </p>

//         {/* 'Create' button */}
//         <button className="btn-primary mr-4" onClick={handleCreate}>
//           Create
//         </button>

//         {/* 'Upload' button */}
//         <button className="btn-primary mr-4" onClick={handleUpload}>
//           Upload
//         </button>

//         {/* Search bar */}
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border rounded px-2 py-1"
//           onChange={handleSearch}
//         />
//       </div>
//     </div>
//   );
// };

// export default SecondHeader;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SecondHeader = ({ onUpload, onSearch, setSearchQuery, onCreateAlbum }) => {
  const navigate = useNavigate();
  const [albumName, setAlbumName] = useState("");

  const handleCreate = () => {
    const name = prompt("Enter the name of the album:");
    if (name) {
      onCreateAlbum(name);
    }
  };

  const handleUpload = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const uploadedImages = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({ file, data: e.target.result });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(uploadedImages).then((images) => {
        onUpload(images);
      });
    }
  };

  const handleSearch = () => {
    // Call the onSearch function with the current search query
    onSearch();
  };

  return (
    <div className="text-center my-8">
      <div className="mt-4">
        <img src="/logo192.png" alt="Small Logo" className="w-12 h-12 mx-auto" />
        <h1 className="text-4xl font-bold mt-2">Your Project Title</h1>
        <p className="text-gray-600 text-sm mt-2">Your project description goes here.</p>

       {/* Create button */}
       <button className="btn-primary mr-4" onClick={handleCreate}>
          Create
        </button>

        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleUpload}
          id="uploadInput"
        />
        <label htmlFor="uploadInput" className="btn-primary mr-4">
          Upload
        </label>

        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-2 py-1"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Search button */}
        <button className="btn-primary ml-2" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SecondHeader;


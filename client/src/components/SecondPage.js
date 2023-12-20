


// import React, { useState } from "react";
// import SecondHeader from "./SecondHeader";

// const SecondPage = () => {
//   const [albums, setAlbums] = useState([]);

//   const handleCreateAlbum = (albumName) => {
//     const newAlbum = {
//       id: new Date().getTime(), // Using timestamp as a unique identifier
//       name: albumName,
//       uploadDate: new Date(),
//       images: [],
//     };

//     setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
//   };

//   return (
//     <div>
//       <SecondHeader onCreateAlbum={handleCreateAlbum} />
//       {/* Display albums */}
//       <div className="mt-4">
//         {albums.map((album, index) => (
//           <div key={index} className="border p-2 mb-2">
//             <h2 className="text-lg font-bold">{album.name}</h2>
//             <p className="text-sm text-gray-600">
//               Uploaded on {album.uploadDate.toString()}
//             </p>
//           </div>
//         ))}
//       </div>
//       {/* Other content on the SecondPage goes here */}
//     </div>
//   );
// };

// export default SecondPage;


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

  const saveAlbumsToLocalStorage = (newAlbums) => {
    localStorage.setItem("albums", JSON.stringify(newAlbums));
  };

  const handleUpload = (newImages) => {
    // Handle upload logic if needed
    console.log("Uploaded images:", newImages);
  };

  const handleCreateAlbum = (albumName) => {
    const newAlbum = {
      id: new Date().getTime(), // Using timestamp as a unique identifier
      name: albumName,
      images: [],
    };

    setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);

    // Save albums to localStorage
    saveAlbumsToLocalStorage([...albums, newAlbum]);
  };

  return (
    <div>
      <SecondHeader onUpload={handleUpload} onCreateAlbum={handleCreateAlbum} />

      {/* Display uploaded images */}
      <div className="mt-4">
        {uploadedImages.map((image, index) => (
          <div key={index}>
            <img
              src={image.data}
              alt={`Uploaded Image ${index + 1}`}
              className="w-48 h-48 object-cover m-2"
            />
          </div>
        ))}
      </div>

      {/* Display albums */}
      <div className="mt-4">
        {albums.map((album, index) => (
          <div key={index} className="border p-2 mb-2">
            <h2 className="text-lg font-bold">{album.name}</h2>
          </div>
        ))}
      </div>

      {/* Other content on the SecondPage goes here */}
    </div>
  );
};

export default SecondPage;


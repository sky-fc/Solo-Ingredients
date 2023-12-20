// import React, { useState, useEffect } from "react";
// import SecondHeader from "./SecondHeader";

// const SecondPage = () => {
//   const handleUpload = (newImages) => {
//     // Handle upload logic if needed
//     console.log("Uploaded images:", newImages);
//   };

//   const handleCreateAlbum = (albumName) => {
//     // Handle create album logic if needed
//     console.log("Created album:", albumName);
//   };

//   return (
//     <div>
//       <SecondHeader onUpload={handleUpload} onCreateAlbum={handleCreateAlbum} />
//     </div>
//   );
// };

// export default SecondPage;


import React, { useState } from "react";
import SecondHeader from "./SecondHeader";

const SecondPage = () => {
  const [albums, setAlbums] = useState([]);

  const handleCreateAlbum = (albumName) => {
    const newAlbum = {
      id: new Date().getTime(), // Using timestamp as a unique identifier
      name: albumName,
      uploadDate: new Date(),
      images: [],
    };

    setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
  };

  return (
    <div>
      <SecondHeader onCreateAlbum={handleCreateAlbum} />
      {/* Display albums */}
      <div className="mt-4">
        {albums.map((album, index) => (
          <div key={index} className="border p-2 mb-2">
            <h2 className="text-lg font-bold">{album.name}</h2>
            <p className="text-sm text-gray-600">
              Uploaded on {album.uploadDate.toString()}
            </p>
          </div>
        ))}
      </div>
      {/* Other content on the SecondPage goes here */}
    </div>
  );
};

export default SecondPage;

import React, { useState, useEffect } from "react";
import SecondHeader from "./SecondHeader";

const SecondPage = () => {
  const handleUpload = (newImages) => {
    // Handle upload logic if needed
    console.log("Uploaded images:", newImages);
  };

  const handleCreateAlbum = (albumName) => {
    // Handle create album logic if needed
    console.log("Created album:", albumName);
  };

  return (
    <div>
      <SecondHeader onUpload={handleUpload} onCreateAlbum={handleCreateAlbum} />
    </div>
  );
};

export default SecondPage;

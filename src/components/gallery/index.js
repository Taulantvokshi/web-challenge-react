import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import axios from 'axios';
import './index.css';

const MainContent = ({ allSelectImages, selectedImages, handleFullScreen }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get('https://eulerity-hackathon.appspot.com/pets')
      .then((response) => {
        setImages(response.data);
      });
  }, []);
  return (
    <div className="main-content">
      {images.map((image, index) => {
        return (
          <ImageCard
            key={image.url}
            imageUrl={image.url}
            imageDescription={image.description}
            imageTitle={image.title}
            index={index}
            selectedImages={selectedImages}
            allSelectImages={allSelectImages}
            handleFullScreen={handleFullScreen}
          />
        );
      })}
    </div>
  );
};

export default MainContent;

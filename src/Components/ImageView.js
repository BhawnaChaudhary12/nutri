import React from 'react';
import { useParams } from 'react-router-dom';
import './ImageView.css';

const ImageView = () => {
  const { imageUrl } = useParams();
  
  return (
    <div className="image-view-container">
      <img src={decodeURIComponent(imageUrl)} alt="Product" className="full-size-image" />
    </div>
  );
};

export default ImageView;

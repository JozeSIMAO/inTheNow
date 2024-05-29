import React, { useEffect } from 'react';

const PreloadImages = ({ images }) => {
  useEffect(() => {
    const preloadImages = () => {
      images.forEach(imageUrl => {
        const img = new Image();
        img.src = imageUrl;
      });
    };

    preloadImages();
    return () => {
    };
  }, [images]);

  return null;
};

export default PreloadImages;

// Loader.js
import React from 'react';
import Lottie from 'lottie-react';
import preloaderAnimation from '../../assets/json/Animation - 1715745618808.json';

const Loader = () => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <Lottie
          animationData={preloaderAnimation}
          className="h-32 w-44"
        />
      </div>
    </div>
  );
};

export default Loader;
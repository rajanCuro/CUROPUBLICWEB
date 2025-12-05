// src/LoaderSpinner.jsx
import React from 'react';
import './LoadingAnimation.css'; // We'll create this CSS file

const LoadingAnimation = () => {
  return (
    <div id="page">
      <div id="container">
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="h3">Curo24</div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
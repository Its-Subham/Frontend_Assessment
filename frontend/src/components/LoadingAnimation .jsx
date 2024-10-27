import React from 'react';
import './LoadingAnimation.css'; // Add styles for animation

const LoadingAnimation = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingAnimation;

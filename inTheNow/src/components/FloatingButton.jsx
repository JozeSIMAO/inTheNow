import './FloatingButton.css';  
import React from 'react';

const FloatingButton = ({ onClick }) => {
    return (
        <button
            type="button"
            className="btn btn-success rounded-circle floating-button"
            onClick={onClick}
        >
            🔻
        </button>
    );
};

export default FloatingButton;

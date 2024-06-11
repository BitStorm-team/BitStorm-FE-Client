// LazyLoadingCard.js
import React from "react";

const LazyLoadingCard = () => {
  return (
    <div className="lazy-loading-card">
      <div className="lazy-loading-image" />
      <div className="lazy-loading-info">
        <div className="loading-line" />
        <div className="loading-line" />
        <div className="loading-line" />
        <div className="loading-line" />
      </div>
    </div>
  );
};

export default LazyLoadingCard;
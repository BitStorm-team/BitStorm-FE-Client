// NotFound.js
import React from 'react';
import NotFoundImg from '../assets/images/notfound.png';
import '../assets/css/notfound.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <img src={NotFoundImg} alt="Not Found" className="not-found-image" />
      <h1 className="not-found-title">Page Not Found</h1>
    </div>
  );
}

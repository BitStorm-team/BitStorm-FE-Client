// NotFound.js
import React from 'react';
import NotFoundImg from '../assets/images/notfound2.jpg';
import '../assets/css/notfound.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <img src={NotFoundImg} alt="Not Found" className="not-found-image" />
      <h1 className="not-found-title">Page Not Found</h1>
      <Button className='btn-back' type="primary"><Link to='/'><HomeOutlined />Back to Home</Link></Button>
    </div>
  );
}

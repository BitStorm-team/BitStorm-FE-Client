import React from 'react';
import '../../assets/css/home/session1.css';
import doctorImage from '../../assets/images/doctorImage.png'; // Ensure you have the image in the src folder or adjust the path accordingly

const Session1 = () => {
  return (
    <div className="home-container">
      <div className="text-content">
        <h1>Chào Mừng Bạn Đến <span className="highlight">BitStorm</span></h1>
        <p>Nơi lắng nghe những tâm sự của bạn</p>
        <button className="start-button">Bắt Đầu Ngay</button>
      </div>
      <div className="image-content">
        <img src={doctorImage} alt="Doctor" />
      </div>
    </div>
  );
};

export default Session1;

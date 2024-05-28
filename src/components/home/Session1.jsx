import React from "react";
import "../../assets/css/home/session1.css";
import doctorImage from "../../assets/images/doctor3D.png"; // Ensure you have the image in the src folder or adjust the path accordingly

const Session1 = () => {
  return (
    <div className="home-container">
      <video className="video-background" autoPlay muted loop>
        <source
          src="https://cdn.pixabay.com/video/2023/02/07/149707-796873472_large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="text-content">
        <h1>
          Chào Mừng Bạn Đến <span className="highlight">BitStorm</span>
        </h1>
        <p>Nơi lắng nghe những tâm sự của bạn</p>
        <button className="start-button">Bắt Đầu Ngay</button>
      </div>
      <div className="image-content">
        <img data-aos="fade-up" src={doctorImage} alt="Doctor" />
      </div>
    </div>
  );
};

export default Session1;

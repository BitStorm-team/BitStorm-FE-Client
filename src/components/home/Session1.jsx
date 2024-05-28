import React, { useEffect } from "react";
import "../../assets/css/home/session1.css";
import doctorImage from "../../assets/images/doctor3D.png"; // Ensure you have the image in the src folder or adjust the path accordingly
import 'aos/dist/aos.css';  // Import AOS styles
import AOS from 'aos';
import scrollDownImg from '../../assets/images/scrolldown-img.png';

const Session1 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <div className="home-container">
      <video className="video-background" autoPlay muted loop>
        <source
          src="https://cdn.pixabay.com/video/2023/02/07/149707-796873472_large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="text-content" data-aos="fade-down">
        <h1>
          Chào Mừng Bạn Đến <span className="highlight">BitStorm</span>
        </h1>
        <p>Nơi lắng nghe những tâm sự của bạn</p>
        <button className="start-button">Bắt Đầu Ngay</button>
        <div className="scroll-down-icon">
          <img style={{ width: '30%' }} src={scrollDownImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Session1;

// src/Session5.js
import React from "react";
import { Button, Typography, Card } from "antd";
import '../../assets/css/home/session5.css';
import img from "../../assets/images/session5image.png";
const { Title, Paragraph } = Typography;

const Session5 = () => {
  return (
    <div className="session5-container">
      <div className="session5-card">
        <div className="session5-content" data-aos="fade-right">
          <img src={img} alt="Doctor" className="session5-image" />
        </div>
        <div className="session5-content" data-aos="fade-left">
          <Title level={2} className="session5-title">
            About Us
          </Title>
          <Title level={3} className="session5-subtitle">
            We Help Your Health
          </Title>
          <Paragraph className="session5-paragraph">
            This profile describes the activities of health services and medical
            support as well as the facilities and conditions of the General
            Hospital which is reflected in the general public served from all
            groups, religions and beliefs, ethnicity and the level and frequency
            of bed occupancy which continues to increase significantly.
          </Paragraph>
          <Button type="primary" className="session5-button">
            More About Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Session5;

// src/Session1.js
import React from "react";
import { Button, Typography, Card } from "antd";
import "../../assets/css/home/session1.css"; // Import the CSS file for custom styles
import session1image from "../../assets/images/session1image.png";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title, Paragraph } = Typography;

const Session1 = () => {
  return (
    <div className="session1-container">
      <div className="session1-card">
        <div className="session1-content" data-aos="fade-right">
          <h2
            className="session1-title"
            style={{
              fontSize: "50px",
            }}
          >
            Well come to
          </h2>

          <div className="box-animation">
            <h1
              style={{
                fontSize: "80px",
              }}
            >
              BitStorm
            </h1>
          </div>
          <Link to='/expert' className="box-2"><button className="button-66" style={{
             display : 'flex',
             alignItems : 'center',
             gap : '10px'
          }}>Book now<CaretRightOutlined /></button></Link>
        </div>
        <div className="session1-content" data-aos="zoom-in-left">
          <img src={session1image} alt="Doctor" className="session1-image" />
        </div>
      </div>
    </div>
  );
};

export default Session1;

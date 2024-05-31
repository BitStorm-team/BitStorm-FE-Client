import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import {
  TeamOutlined,
  BuildOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import "../../assets/css/home/session4.css";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";

const cardsData = [
  {
    icon: <TeamOutlined style={{ fontSize: "64px", color: "#1890ff" }} />,
    title: "Online Consultation",
    description:
      "Receive enthusiastic support from experts in the consulting field.",
  },
  {
    icon: <BuildOutlined style={{ fontSize: "64px", color: "#52c41a" }} />,
    title: "Community Building",
    description:
      "Build a civilized community for everyone to develop together.",
  },
  {
    icon: (
      <CheckCircleOutlined style={{ fontSize: "64px", color: "#eb2f96" }} />
    ),
    title: "Information Moderation",
    description:
      "There's something you don't know: information moderation is quite interesting.",
  },
  {
    icon: (
      <DollarCircleOutlined style={{ fontSize: "64px", color: "#faad14" }} />
    ),
    title: "Completely Free",
    description: "Get advice from everyone completely free of charge.",
  },
];

const Session4 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <div className="session4">
      <h2>Why Choose Us</h2>
      <h1>The Right Choice for You</h1>
      <Row className="box-card" gutter={16}>
        {cardsData.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              className="session4-card"
              data-aos="fade-up"
              hoverable
              cover={card.icon}
            >
              <Card.Meta title={card.title} description={card.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Session4;

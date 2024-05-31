import React from "react";
import { Card, Button } from "antd";
import { PlayCircleOutlined, StarOutlined } from "@ant-design/icons";
import "../../assets/css/home/session3.css";
import session3image1 from "../../assets/images/session3imagge1.jpg";
import session3image2 from "../../assets/images/session3imagge2.jpg";
import session3image3 from "../../assets/images/session3imagge3.jpg";
import session3image4 from "../../assets/images/session3imagge4.jpg";

const { Meta } = Card;
const podcastData = [
  {
    title: "Healing the Souls of Those Who Worry...",
    duration: "10h30",
    image: session3image1, // Ensure you have the image or replace it with your image URL
  },
  {
    title: "Be Grateful for Life Giving You the Chance to Live...",
    duration: "11h15",
    image: session3image2,
  },
  {
    title: "Help Others to Change Yourself",
    duration: "30m",
    image: session3image3,
  },
  {
    title: "Effective Learning Methods...",
    duration: "45m",
    image: session3image4,
  },
  {
    title: "Effective Learning Methods...",
    duration: "45m",
    image: session3image4,
  },
  {
    title: "Effective Learning Methods...",
    duration: "45m",
    image: session3image4,
  },

];

const Session3 = () => {
  return (
    <div className="session3-container">
      <h3 className="session3-subtitle">Recommended for You</h3>
      <h2 className="session3-title">A Few Soulful Podcasts</h2>
      <div className="podcast-grid">
        {podcastData.map((podcast, index) => (
          <Card
            data-aos="fade-up"
            key={index}
            hoverable
            className="podcast-card"
            cover={
              <img
                alt={podcast.title}
                src={podcast.image}
                className="podcast-image"
              />
            }
          ></Card>
        ))}
      </div>

    </div>
  );
};

export default Session3;

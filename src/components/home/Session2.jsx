import React, { useEffect } from 'react';
import { Card, Carousel } from 'antd';
import { HomeOutlined, InfoCircleOutlined, TeamOutlined, ReadOutlined } from '@ant-design/icons';
import 'aos/dist/aos.css';  // Import AOS styles
import AOS from 'aos';
import '../../assets/css/home/session2.css';

const { Meta } = Card;
const cardsData = [
  {
    icon: <InfoCircleOutlined className="card-icon" />,
    title: "About us",
    description: "Here we will talk about this app, and we can also introduce you to some secrets and tips to use the app effectively.",
  },
  {
    icon: <HomeOutlined className="card-icon" />,
    title: "Home page",
    description: "This is where you can find information related to the app, and you can write statuses to share your thoughts with strangers on this platform.",
  },
  {
    icon: <TeamOutlined className="card-icon" />,
    title: "Contact expert",
    description: "This website allows you to chat one-on-one with experts, people who have overcome depression or have experience and useful advice.",
  },
  {
    icon: <ReadOutlined className="card-icon" />,
    title: "Blog",
    description: "A place to read articles about depression and confessions from others, and it's also a place where you can share your own articles.",
  },
];


const Session2 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <div className="session2-container">
      <h2 className="session2-title">Some Services</h2>
      <Carousel dotPosition="bottom">
        <div>
          <div className="carousel-item">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                hoverable
                className={`service-card ${index === 1 ? 'active' : ''}`} // Adding 'active' class to the second card
                cover={card.icon}
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom" // AOS attribute
              >
                <Meta title={card.title} description={card.description} />
              </Card>
            ))}
          </div>
        </div>
        {/* Add more carousel items if needed */}
      </Carousel>
    </div>
  );
};

export default Session2;

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
    description: "Ở đây chúng tôi sẽ nói về app này, bên cạnh đó có thể giới thiệu cho bạn một số bí mật và kĩ năng sử dụng tốt app nhất.",
  },
  {
    icon: <HomeOutlined className="card-icon" />,
    title: "Home page",
    description: "Nơi cung cấp cho các bạn về các thông tin liên quan về app, bạn có thể viết status để tâm sự cùng người lạ trên nền này.",
  },
  {
    icon: <TeamOutlined className="card-icon" />,
    title: "Contact expert",
    description: "Trang web này cho phép bạn chat 1 1 với chuyên gia, với những người đã vượt qua trầm cảm hoặc có kinh nghiệm, có những lời khuyên hữu ích.",
  },
  {
    icon: <ReadOutlined className="card-icon" />,
    title: "Blog",
    description: "Nơi để đọc những bài viết về trầm cảm và tâm sự từ những người khác, đồng thời cũng là nơi bạn có thể viết bài chia sẻ.",
  },
];

const Session2 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <div className="session2-container">
      <h2 className="session2-title">Một Số Dịch Vụ</h2>
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

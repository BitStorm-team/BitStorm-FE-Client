import React from 'react';
import { Card, Button } from 'antd';
import { PlayCircleOutlined, StarOutlined } from '@ant-design/icons';
import '../../assets/css/home/session3.css';


const { Meta } = Card;

const podcastData = [
  {
    title: 'Chữa lành tâm hồn những người đang âu lo...',
    duration: '10h30',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShQqPNKkb3VIP2yuPwTbHsZdDcttdAk6x-wqc9kM0muP0tgmdErQtQy2DscNBv13XIsKg&usqp=CAU', // Ensure you have the image or replace it with your image URL
  },
  {
    title: 'Hãy cảm ơn cuộc đời vì đã cho bạn sống...',
    duration: '11h15',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNP78273Z1SwMYy0rcTRkCF3dK87tykat6vyu3Dm9BRiSmOSroWukrezjQ3xnuzWh81g&usqp=CAU',
  },
  {
    title: 'Hãy giúp những người khác để thay đổi bản thân',
    duration: '30p',
    image: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
  },
  {
    title: 'Cách học sao cho hiệu quả bằng phương pháp...',
    duration: '45p',
    image: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
  },
];

const Session3 = () => {
  return (
    <div className="session3-container">
      <h3 className="session3-subtitle">Giới Thiệu Cho Bạn</h3>
      <h2 className="session3-title">Một Vài Podcast Tâm Hồn</h2>
      <div className="podcast-grid">
        {podcastData.map((podcast, index) => (
          <Card
            data-aos="fade-up"
            key={index}
            hoverable
            className="podcast-card"
            cover={<img alt={podcast.title} src={podcast.image} className="podcast-image" />}
            actions={[<StarOutlined key="star" />]}
          >
            <Meta
              title={podcast.title}
              description={
                <>
                  <div className="podcast-duration">
                    <PlayCircleOutlined /> {podcast.duration}
                  </div>
                  <div className="podcast-rating">★★★★★</div>
                </>
              }
            />
          </Card>
        ))}
      </div>
      <Button type="primary" className="see-more-button">Xem Thêm →</Button>
    </div>
  );
};

export default Session3;

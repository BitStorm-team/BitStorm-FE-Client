import React from 'react';
import { Card, Carousel } from 'antd';
import { HomeOutlined, InfoCircleOutlined, TeamOutlined, ReadOutlined } from '@ant-design/icons';
import '../../assets/css/home/session2.css';


const { Meta } = Card;

const contentStyle = {
  height: '160px',
  color: '#000',
  textAlign: 'center',
  background: '#fff',
};

const Session2 = () => {
  return (
    <div className="session2-container">
      <h2 className="session2-title">Một Số Dịch Vụ</h2>
      <Carousel dotPosition="bottom">
        <div>
          <div className="carousel-item">
            <Card hoverable className="service-card" cover={<InfoCircleOutlined className="card-icon" />}>
              <Meta title="About us" description="Ở đây chúng tôi sẽ nói về app này, bên cạnh đó có thể giới thiệu cho bạn một số bí mật và kĩ năng sử dụng tốt app nhất." />
            </Card>
            <Card hoverable className="service-card active" cover={<HomeOutlined className="card-icon" />}>
              <Meta title="Home page" description="Nơi cung cấp cho các bạn về các thông tin liên quan về app, bạn có thể viết status để tâm sự cùng người lạ trên nền này." />
            </Card>
            <Card hoverable className="service-card" cover={<TeamOutlined className="card-icon" />}>
              <Meta title="Contact expert" description="Trang web này cho phép bạn chat 1 1 với chuyên gia, với những người đã vượt qua trầm cảm hoặc có kinh nghiệm, có những lời khuyên hữu ích." />
            </Card>
            <Card hoverable className="service-card" cover={<ReadOutlined className="card-icon" />}>
              <Meta title="Blog" description="Nơi để đọc những bài viết về trầm cảm và tâm sự từ những người khác, đồng thời cũng là nơi bạn có thể viết bài chia sẻ." />
            </Card>
          </div>
        </div>
        {/* Add more carousel items if needed */}
      </Carousel>
    </div>
  );
};

export default Session2;

import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { TeamOutlined, BuildOutlined, CheckCircleOutlined, DollarCircleOutlined } from '@ant-design/icons';
import '../../assets/css/home/session4.css';
import 'aos/dist/aos.css';  // Import AOS styles
import AOS from 'aos';

const cardsData = [
  {
    icon: <TeamOutlined style={{ fontSize: '64px', color: '#1890ff' }} />,
    title: "Tư Vấn Online",
    description: "Được sự hỗ trợ nhiệt tình từ các chuyên gia trong lĩnh vực tư vấn.",
  },
  {
    icon: <BuildOutlined style={{ fontSize: '64px', color: '#52c41a' }} />,
    title: "Xây Dựng Cộng Đồng",
    description: "Xây dựng một cộng đồng văn minh để mọi người cùng nhau phát triển.",
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: '64px', color: '#eb2f96' }} />,
    title: "Kiểm duyệt thông tin",
    description: "Có một điều bạn chưa biết phần kiểm duyệt thông tin khá là hay.",
  },
  {
    icon: <DollarCircleOutlined style={{ fontSize: '64px', color: '#faad14' }} />,
    title: "Hoàn toàn miễn phí",
    description: "Nhận được sự tư vấn từ mọi người hoàn toàn miễn phí.",
  },
];

const Session4 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <div className="session4">
      <h2>Tại sao lại lựa chọn chúng tôi</h2>
      <h1>Sự Lựa Chọn Đúng Đắn Dành Cho Bạn</h1>
      <Row gutter={16}>
        {cardsData.map((card, index) => (
          <Col span={6} key={index}>
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

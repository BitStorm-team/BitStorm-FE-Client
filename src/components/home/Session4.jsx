// Session4.js
import React from 'react';
import { Card, Row, Col } from 'antd';
import { TeamOutlined, BuildOutlined, CheckCircleOutlined, DollarCircleOutlined } from '@ant-design/icons';
import '../../assets/css/home/session4.css';


const Session4 = () => {
  return (
    <div className="session4">
      <h2>Tại sao lại lựa chọn chúng tôi</h2>
      <h1>Sự Lựa Chọn Đúng Đắn Dành Cho Bạn</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            className="session4-card"
            hoverable
            cover={<TeamOutlined style={{ fontSize: '64px', color: '#1890ff' }} />}
          >
            <Card.Meta title="Tư Vấn Online" description="Được sự hỗ trợ nhiệt tình từ các chuyên gia trong lĩnh vực tư vấn." />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="session4-card"
            hoverable
            cover={<BuildOutlined style={{ fontSize: '64px', color: '#52c41a' }} />}
          >
            <Card.Meta title="Xây Dựng Cộng Đồng" description="Xây dựng một cộng đồng văn minh để mọi người cùng nhau phát triển." />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="session4-card"
            hoverable
            cover={<CheckCircleOutlined style={{ fontSize: '64px', color: '#eb2f96' }} />}
          >
            <Card.Meta title="Kiểm duyệt thông tin" description="Có một điều bạn chưa biết phần kiểm duyệt thông tin khá là hay." />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="session4-card"
            hoverable
            cover={<DollarCircleOutlined style={{ fontSize: '64px', color: '#faad14' }} />}
          >
            <Card.Meta title="Hoàn toàn miễn phí" description="Nhận được sự tư vấn từ mọi người hoàn toàn miễn phí." />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Session4;

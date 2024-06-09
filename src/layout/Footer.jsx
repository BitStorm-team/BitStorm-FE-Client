import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, YoutubeOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import '../assets/css/footer.css';
import Logo from '../components/Logo';

const { Footer } = Layout;
const { Title, Paragraph } = Typography;

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <Row justify="space-between">
        <Col xs={24} sm={12} md={6} className="footer-section">
          <Logo />
          <Paragraph>The Place Where Your Soul is Heard</Paragraph>
          <div className="social-icons">
            <FacebookOutlined />
            <TwitterOutlined />
            <InstagramOutlined />
            <LinkedinOutlined />
            <YoutubeOutlined />
          </div>
        </Col>
        <Col xs={24} sm={12} md={4} className="footer-section">
          <Title level={3}>Community</Title>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact us</a>
            </li>
            <li>
              <a href="/culture">Culture</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={4} className="footer-section">
          <Title level={3}>Support</Title>
          <ul>
            <li>
              <a href="/getting-started">Getting started</a>
            </li>
            <li>
              <a href="/help-center">Help center</a>
            </li>
            <li>
              <a href="/server-status">Server status</a>
            </li>
            <li>
              <a href="/share-feeling">Share your feeling</a>
            </li>
            <li>
              <a href="/phone-support">Phone call support</a>
            </li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-section">
          <Title level={3}>Contact us</Title>
          <ul>
            <li>
              <MailOutlined />{" "}
              <a href="mailto:BitStorm@btst.com">BitStorm@btst.com</a>
            </li>
            <li>
              <PhoneOutlined /> <a href="tel:+4146875892">(414) 687 - 5892</a>
            </li>
            <li>
              <EnvironmentOutlined />{" "}
              <a href="https://goo.gl/maps/your-address">99 Tô Hiến Thành</a>
            </li>
          </ul>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;

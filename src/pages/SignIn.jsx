// Login.js
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { FacebookOutlined, GoogleOutlined, TwitterOutlined } from '@ant-design/icons';
import '../assets/css/auth/LoginRegister.css';


const { Title, Link } = Typography;

const SignIn = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <div className="form-container">
      <Title level={2} className="form-title">Đăng nhập</Title>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email!' }]}
        >
          <Input placeholder="Địa chỉ email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Link href="#" className="forgot-password">Quên mật khẩu?</Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">Đăng nhập</Button>
        </Form.Item>
        <Form.Item>
          <div className="social-login">
            <span>Hoặc đăng nhập bằng</span>
            <div className="social-icons">
              <FacebookOutlined className="social-icon" />
              <GoogleOutlined className="social-icon" />
              <TwitterOutlined className="social-icon" />
            </div>
          </div>
        </Form.Item>
        <Form.Item>
          <span>Bạn chưa có tài khoản? <Link href="#">Đăng Ký</Link></span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;

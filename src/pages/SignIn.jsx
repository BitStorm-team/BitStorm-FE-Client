// Login.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import "../assets/css/auth/LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { fetchCsrfToken, signIn } from "../api";
import { setStorage } from "../utils/helpers";

const { Title, Link } = Typography;

const SignIn = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      const data = await signIn(values, csrfToken);
      const { access_token, expires_in } = data;
      // Handle success
      console.log("Login successful:", data);

      setStorage("__token__", access_token);
      setStorage("expires_in", expires_in);
      navigate("/");
    } catch (error) {
        console.error("Login failed:", error);
        message.error(
          "Đăng nhập không thành công: " +
            (error.response?.data?.message || error.message)
        );
    }
  };

  return (
    <div className="form-container">
      <Title level={2} className="form-title">
        Đăng nhập
      </Title>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ email!" }]}
        >
          <Input placeholder="Địa chỉ email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Link href="#" className="forgot-password">
            Quên mật khẩu?
          </Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Đăng nhập
          </Button>
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
          <span>
            Bạn chưa có tài khoản? <Link href="/signup">Đăng Ký</Link>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;

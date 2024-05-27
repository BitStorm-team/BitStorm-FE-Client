// Login.js
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import "../assets/css/auth/LoginRegister.css";
import axios from "axios";
import { API_URL, API_URL_BACKUP, setStorage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import fetchCsrfToken from "../api/csrf-token";

const { Title, Link } = Typography;

const SignIn = () => {
  // state
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();
  // get csrf token
  useEffect(() => {
    fetchCsrfToken(setCsrfToken);
  }, []); // Empty dependency array to run only once on mount

  //  handle login request
  const onFinish = async (values) => {
    const URL = API_URL + "/auth/login";
    const URL_BACKUP = API_URL_BACKUP + "/auth/login";
    try {
      // First attempt with primary URL
      const response = await axios.post(URL, values, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });

      const { access_token, expires_in } = response.data;
      setStorage("__token__", access_token);
      setStorage("expires_in", expires_in);
      navigate("/");
    } catch (error) {
      console.log("Primary server error:", error);

      try {
        // Attempt with backup URL
        const responseBackup = await axios.post(URL_BACKUP, values, {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        });

        const { access_token, expires_in } = responseBackup.data;
        setStorage("__token__", access_token);
        setStorage("expires_in", expires_in);
        navigate("/");
      } catch (backupError) {
        console.log("Backup server error:", backupError);
        message.error("Login failed");
      }
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

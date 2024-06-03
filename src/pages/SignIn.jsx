// Login.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import "../assets/css/auth/LoginRegister.css";
import "../assets/css/auth/Login.css";

import { fetchCsrfToken, signIn } from "../api";
import { setStorage } from "../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import imagLLogin from "../assets/images/signupimage.jpg";
const { Title } = Typography;

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
    <div className="login-container">
      <main className="login-box">
        <div className="login-container-item">
          <div className="form-container">
            <Title level={1} className="form-title">
              Login
            </Title>
            <Form name="login" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address!",
                  },
                ]}
              >
                <Input placeholder="Email address" className="input-form" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  id="Password"
                  placeholder="Password"
                  className="input-form"
                />
              </Form.Item>
              <Form.Item>
                <Link href="#" className="forgot-password">
                  Forgot password?
                </Link>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="form-button"
                >
                  Login
                </Button>
              </Form.Item>
              <Form.Item>
                <span>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </span>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="login-container-item">
          <img src={imagLLogin} alt="Login" />
        </div>
      </main>
    </div>
  );
};

export default SignIn;

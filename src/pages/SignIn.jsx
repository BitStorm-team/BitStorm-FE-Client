// Login.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import "../assets/css/auth/LoginRegister.css";
import "../assets/css/auth/Login.css";
import { fetchCsrfToken, signIn } from "../api";
import { setStorage } from "../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import imagLLogin from "../assets/images/signupimage.jpg";

const { Title } = Typography;

const SignIn = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(false); // 1. Introduce loading state
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
    setLoading(true); // 2. Start loading when sign-in process starts
    try {
      const data = await signIn(values, csrfToken);
      const { access_token, expires_in } = data;
      console.log("Login successful:", data);
      setStorage("__token__", access_token);
      setStorage("expires_in", expires_in);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      message.error(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false); // 3. Stop loading when sign-in process completes
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
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="form-button"
                  loading={loading} // 4. Use loading state to display loading indicator
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

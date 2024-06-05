// Register.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Radio } from "antd";
import "../assets/css/auth/LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchCsrfToken, signUp } from "../api";
import "../assets/css/auth/Login.css";
import signUpImage from "../assets/images/session1image.png";

const { Title } = Typography;

const SignUp = () => {
  // states
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  // effects
  useEffect(() => {
    fetchCsrfToken(setCsrfToken);
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    // if expert
    if (values.role_id === 3 || values.role_id === "3") {
      localStorage.setItem("values", JSON.stringify(values));
      navigate("/signup/expert");
    } else {
      signUp(values, navigate);
    }
  };

  // render
  return (
    <div className="login-container">
      <main className="login-box signup-box">
        <div className="login-container-item">
          <div className="form-container">
            <Title level={2} className="form-title">
              Sign Up
            </Title>
            <Form name="register" onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address!",
                  },
                ]}
              >
                <Input placeholder="Email address" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                ]}
              >
                <Input.Password placeholder="Password (at least 8 characters)" />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
              <Form.Item name="role_id" className="role-selector">
                <Radio.Group style={{ width: "100%" }}>
                  <Radio.Button style={{ width: "50%" }} value={2}>
                    Advice Receiver
                  </Radio.Button>
                  <Radio.Button style={{ width: "50%" }} value={3}>
                    Advisor
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="form-button"
                >
                  Sign Up
                </Button>
              </Form.Item>

              <Form.Item>
                <span>
                  Already have an account? <Link to="/signin">Sign In</Link>
                </span>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="login-container-item">
          <img src={signUpImage} alt="Sign Up" />
        </div>
      </main>
    </div>
  );
};

export default SignUp;

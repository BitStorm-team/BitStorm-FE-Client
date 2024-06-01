// Register.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Radio } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import "../assets/css/auth/LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchCsrfToken, signUp } from "../api";
import "../assets/css/auth/Login.css";
import imagLLogin from "../assets/images/session1image.png";

const { Title } = Typography;
const SingUp = () => {
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
              Đăng ký
            </Title>
            <Form name="register" onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ email!" },
                ]}
              >
                <Input placeholder="Địa chỉ email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                    min: 8,
                    message: "Mật khẩu ít nhất 8 ký tự!",
                  },
                ]}
              >
                <Input.Password placeholder="Mật khẩu (ít nhất 8 kí tự)" />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hai mật khẩu bạn nhập không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu" />
              </Form.Item>
              <Form.Item name="role_id" className="role-selector">
                <Radio.Group>
                  <Radio.Button  value={2}>Người nhận tư vấn</Radio.Button>
                  <Radio.Button  value={3}>Người tư vấn</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="form-button"
                >
                  Đăng ký
                </Button>
              </Form.Item>

              <Form.Item>
                <span>
                  Đã có tài khoản? <Link to='/signin'>Đăng Nhập</Link>
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

export default SingUp;

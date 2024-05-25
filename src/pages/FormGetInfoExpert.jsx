import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const FormGetInforExpert = () => {
  // states
  const [parentValues, setParentValues] = useState({});
  // effects
  useEffect(() => {
    setParentValues((old) => localStorage.getItem("values"));
  }, []);
  console.log(parentValues);
  // functions
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#e6f7ff",
      }}
    >
      <div
        style={{
          width: 400,
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Vui lòng cung cấp thêm thông tin
        </h2>
        <Form
          name="basic"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select>
              <Option value="male">Nam</Option>
              <Option value="female">Nữ</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Kinh nghiệm"
            name="experience"
            rules={[
              { required: true, message: "Please input your experience!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone_number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Hoàn Tất
            </Button>
          </Form.Item>
          <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form>
      </div>
    </div>
  );
};

export default FormGetInforExpert;

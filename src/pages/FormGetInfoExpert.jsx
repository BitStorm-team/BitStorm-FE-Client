import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/helpers";
import signUp from "../api/signUp";

const FormGetInforExpert = () => {
  const [parentValues, setParentValues] = useState({});
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const storedValues = localStorage.getItem("values");
    if (storedValues) {
      setParentValues(JSON.parse(storedValues));
    }
  }, []);

  const onFinish = async (values) => {
    const { experience } = values;
    const formData = {
      experience: experience,
      certificate: imageUrl,
      ...parentValues
    };
    // reister here
    signUp(formData,navigate)
  };

  const handleChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // Limit to only one file
    setFileList(fileList);

    if (info.file.status === "done") {
      setImageUrl(info.file.originFileObj);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
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
        <h2 style={{ textAlign: "center" }}>Vui lòng cung cấp thêm thông tin</h2>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            label="Kinh nghiệm"
            name="experience"
            rules={[{ required: true, message: "Please input your experience!" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Upload your certificate"
            name="upload"
            rules={[{ required: true, message: "Please upload your file!" }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false} // Prevent auto upload
            >
              {fileList.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {imageUrl && (
            <Form.Item>
              <img src={URL.createObjectURL(imageUrl)} alt="Uploaded Image" style={{ width: "100%" }} />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Hoàn Tất
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormGetInforExpert;

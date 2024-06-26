import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api";

const FormGetInfoExpert = () => {
  const [parentValues, setParentValues] = useState({});
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const storedValues = localStorage.getItem("values");
    if (storedValues) {
      setParentValues(JSON.parse(storedValues));
    }
  }, []);

  const getUrlUpdateUserImg = async (file) => {
    const CLOUD_NAME = "dugeyusti";
    const PRESET_NAME = "expert_upload";
    const FOLDER_NAME = "BitStorm";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch(api, options);
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { experience } = values;
    try {
      const imageUrl = await getUrlUpdateUserImg(fileList[0].originFileObj);
      const formData = {
        experience: experience,
        certificate: imageUrl,
        ...parentValues,
      };
      await signUp(formData, navigate);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
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
        <h2 style={{ textAlign: "center" }}>Please provide additional information</h2>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            label="Experience"
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
              beforeUpload={() => false}
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
            <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormGetInfoExpert;

import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  List,
  Avatar,
  Row,
  Col,
  Modal,
  Form,
  message,
  Switch,
  Spin,
} from "antd";
import PostCart from "../components/posts/PostCart";
import { getUserProfile } from "../api"; // Ensure this import is correct
import axios from "axios";
import { API_URL } from "../utils/helpers";
import Loading from "../components/expertDetail/Loading";


const { Search } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 20 },
  },
};

export default function Post() {
  const [isModalCreatePostOpen, setIsModalCreatePostOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [form] = Form.useForm();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userProfile = await getUserProfile();
        console.log("User Profile:", userProfile);
        setUserProfile(userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("__token__");

    const fetchPosts = async () => {
      setLoading(true); // Set loading to true before fetching posts
      try {
        const response = await axios.get(`${API_URL}/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          message.error(`Error fetching posts: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        message.error("Failed to fetch posts");
      } finally {
        setLoading(false); // Set loading to false after fetching posts
      }
    };

    fetchPosts();
  }, []);

  const handleFormCreatePost = async () => {
    const token = localStorage.getItem("__token__");
    if (!token) {
      console.error("No token found");
      return;
    }
  
    setLoading(true);
  
    try {
      const values = form.getFieldsValue();
      console.log("Form values:", values);
  
      const createResponse = await axios.post(
        `${API_URL}/posts/create`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (createResponse.data.success) {
        message.success("Post created successfully!");
        form.resetFields();
        setIsModalCreatePostOpen(false);
  
        // Fetch posts again to update the table
        const fetchResponse = await axios.get(`${API_URL}/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (fetchResponse.data.success) {
          setPosts(fetchResponse.data.data);
        } else {
          message.error(`Error fetching posts: ${fetchResponse.data.message}`);
        }
      } else {
        message.error(`Error: ${createResponse.data.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post");
    } finally {
      setLoading(false); // Reset loading to false after process completes
    }
  };
  

return (
  <>
    {/* Modal for creating post */}
    <Modal
      title="Create Post"
      open={isModalCreatePostOpen}
      onCancel={() => setIsModalCreatePostOpen(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalCreatePostOpen(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFormCreatePost} loading={loading} >
          Submit
        </Button>,
      ]}
    >
      <Form
        {...formItemLayout}
        form={form}
        initialValues={{ is_anonymous: false }}
        variant="filled"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Content"
          name="content"
          rules={[
            { required: true, message: "Please input!" },
            {
              whitespace: true,
              message: "Content cannot be empty or whitespace!",
            },
            {
              min: 5,
              message: "Content must be at least 5 characters long!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Anonymous"
          name="is_anonymous"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>

    <Row style={{ margin: "10px 50px" }} justify="center">
      <Col span={24}>
        <Search placeholder="input search text" enterButton />
      </Col>
      <Col span={24}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Col xs={3} lg={1}>
            {userProfile && (
              <Avatar
                size={50}
                src={userProfile.profile_picture}
                alt={userProfile.name}
              />
            )}
          </Col>
          <Col xs={21} lg={23}>
            <Input
              placeholder="Are you okay today?"
              style={{ borderRadius: "40px", flex: 1 }}
              onClick={() => setIsModalCreatePostOpen(true)}
            />
          </Col>
        </Row>
        {loading ? (
          <Loading />
        ) : (
          <Row>
            {posts.slice().reverse().map((post) => (
              <Col span={24} key={post.id}>
                <PostCart post={post} currentUser={userProfile}/>
              </Col>
            ))}
          </Row>
          )}
        </Col>
      </Row>
    </>
  );
}
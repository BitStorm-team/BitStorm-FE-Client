import React, {useEffect, useState} from 'react'
import {Avatar, Button, Col, Form, Input, message, Modal, Row, Switch,} from 'antd'
import PostCart from '../components/posts/PostCart'
import {getUser} from '../api' // Ensure this import is correct
import axios from 'axios'
import {API_URL, headerAPI} from '../utils/helpers'
import Loading from '../components/expertDetail/Loading'
import {getLikedPosts} from '../api/post'


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
  const [likedPosts, setLikedPosts] = useState([]);
  const user=getUser();
  useEffect(() => {
    const fetchData = async () => {
      const likedPosts = await getLikedPosts();
      setLikedPosts(likedPosts)
    }
    fetchData();
  }, []);

  const fetchPosts = async () => {
    setLoading(true) // Set loading to true before fetching posts
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: headerAPI(),
      })
      if (response.data.success) {
        setPosts(response.data.data)
      } else {
        message.error(`Error fetching posts: ${response.data.message}`)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      message.error('Failed to fetch posts')
    } finally {
      setLoading(false) // Set loading to false after fetching posts
    }
  }

  useEffect(() => {
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
          headers: headerAPI(),
        }
      );

      if (createResponse.data.success) {
        message.success("Post created successfully!");
        form.resetFields();
        setIsModalCreatePostOpen(false);

        // Fetch posts again to update the table
        const fetchResponse = await axios.get(`${API_URL}/posts`, {
          headers: headerAPI(),
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
      setLoading(false);
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
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Col xs={3} lg={1}>
            {user && (
              <Avatar
                size={50}
                src={user.profile_picture}
                alt={user.name}
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
            {posts.slice().reverse().map((post) => {

              const isLiked = likedPosts.some((it) =>
                parseInt(it.post_id) === parseInt(post.id)
              );
              console.log('isLiked:', likedPosts);
              return (
                <Col span={24} key={post.id}>
                  <PostCart post={post} setPosts={setPosts} isLiked={isLiked} />
                </Col>
              );
            })}
          </Row>
          )}
        </Col>
      </Row>
    </>
  );
}
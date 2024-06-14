import {
  CommentOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL, headerAPI } from "../../utils/helpers";
import {
  deletePostApi,
  getAllPostsApi,
  likePostApi,
  unlikePostApi,
} from "../../api/post";
import PostDetail from "./PostDetail";
import { getUser } from "../../api";

const PostContent = styled.div`
  margin-left: 10px;
`;

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

const PostCart = ({ post, setPosts, isLiked }) => {
  const currentUser = getUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [isModalUpdatePostOpen, setIsModalUpdatePostOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalPostDetailOpen, setIsModalPostDetailOpen] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const { id, content, is_anonymous, user } = post;
  const words = content.split(" ");
  const isLongContent = words.length > 50;
  const displayedContent = isExpanded ? content : words.slice(0, 50).join(" ");

  useEffect(() => {
    setLiked(isLiked);
    console.log(liked, "whjkvw");
  }, [isLiked]);

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      try {
        const response = await likePostApi(post.id);
        if (response.success) {
          message.success("Liked");
        } else {
          setLikeCount(post.like_count);
          message.error("Error liking the post");
        }
      } catch (error) {
        setLikeCount(post.like_count);
        message.error("Failed to like post");
      }
    }
  };

  const handleUnlike = async () => {
    setLiked(false);
    setLikeCount(likeCount - 1);
    if (liked) {
      try {
        const response = await unlikePostApi(post.id);
        if (response.success) {
          message.success("Unliked");
        } else {
          setLikeCount(post.like_count);
          message.error("Error unliking the post");
        }
      } catch (error) {
        setLikeCount(post.like_count);
        message.error("Failed to unlike post");
      }
    }
  };

  const handleFormUpdatePost = () => {
    form
      .validateFields()
      .then(async (values) => {
        const token = localStorage.getItem("__token__");
        if (!token) {
          console.error("No token found");
          return;
        }
        setLoading(true);
        try {
          const response = await axios.put(
            `${API_URL}/posts/update/${id}`,
            values,
            {
              headers: headerAPI(),
            }
          );
          if (response.data.success) {
            message.success("Post updated successfully!");
            setIsModalUpdatePostOpen(false);
            form.resetFields();

            // Fetch posts again to update the table
            const fetchResponse = await getAllPostsApi();
            if (fetchResponse.data.success) {
              setPosts(fetchResponse.data.data);
            } else {
              message.error(
                `Error fetching posts: ${fetchResponse.data.message}`
              );
            }
          } else {
            message.error(`Error: ${response.data.message}`);
          }
        } catch (error) {
          console.error("Error updating post:", error);
          message.error("Failed to update post");
        } finally {
          setLoading(false);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setLoading(false);
      });
  };

  const handleDeletePost = async () => {
    setLoading(true);
    try {
      const response = await deletePostApi(id);
      if (response.data.success) {
        const fetchResponse = await getAllPostsApi();
        if (fetchResponse.data.success) {
          setPosts(fetchResponse.data.data);
          setLoading(false);
        } else {
          message.error(`Error fetching posts: ${fetchResponse.data.message}`);
        }
        message.success(response.data.message || "Delete post successfully");
        setIsModalDeleteOpen(false);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error("Failed to delete post");
      setLoading(false);
    }
  };

  const showUpdateModal = () => {
    form.setFieldsValue({
      content,
      is_anonymous,
    });
    setIsModalUpdatePostOpen(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={showUpdateModal}>
        Update Post
      </Menu.Item>
      <Menu.Item key='2' onClick={() => setIsModalDeleteOpen(true)}>
        Delete Post
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      {/* Modal for update post */}
      <Modal
        title='Update Post'
        visible={isModalUpdatePostOpen}
        onCancel={() => setIsModalUpdatePostOpen(false)}
        footer={[
          <Button key='back' onClick={() => setIsModalUpdatePostOpen(false)}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={handleFormUpdatePost}
            loading={loading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{ is_anonymous: false }}
          variant='filled'
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label='Content'
            name='content'
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
            label='Anonymous'
            name='is_anonymous'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        title='Confirm Delete This Comment'
        visible={isModalDeleteOpen}
        onCancel={() => setIsModalDeleteOpen(false)}
        footer={[
          <Button key='cancel' onClick={() => setIsModalDeleteOpen(false)}>
            Cancel
          </Button>,
          <Button
            key='delete'
            type='primary'
            danger
            loading={loading}
            onClick={handleDeletePost}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{ marginRight: "1rem" }}
            size={40}
            src={user.profile_picture}
            alt={user.name}
          />
          <p>
            <strong>{is_anonymous ? "Anonymous" : user.name}</strong>
          </p>
        </div>
        {user?.id === currentUser?.id && (
          <Dropdown overlay={menu} trigger={["click"]}>
            <EllipsisOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
          </Dropdown>
        )}
      </div>
      <PostContent>
        <p style={{ marginBottom: "0" }}>{displayedContent}</p>
        {isLongContent && (
          <Button
            style={{ padding: "0" }}
            type='link'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Show More"}
          </Button>
        )}
      </PostContent>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {liked ? (
          <HeartFilled
            style={{ color: "#F32525", fontSize: "32px", cursor: "pointer" }}
            onClick={handleUnlike}
          />
        ) : (
          <HeartOutlined
            style={{ fontSize: "32px", cursor: "pointer" }}
            onClick={handleLike}
          />
        )}
        <CommentOutlined
          style={{ fontSize: "32px", cursor: "pointer" }}
          onClick={() => setIsModalPostDetailOpen(true)}
        />
      </div>
      <span style={{ marginLeft: "8px" }}>{likeCount} likes</span>
      {isModalPostDetailOpen && (
        <PostDetail
          post={post}
          isModalPostDetailOpen={isModalPostDetailOpen}
          setIsModalPostDetailOpen={setIsModalPostDetailOpen}
        />
      )}
    </div>
  );
};

export default PostCart;

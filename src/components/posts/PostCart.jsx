import { CommentOutlined, HeartOutlined, HeartTwoTone, UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Form, Input, Menu, Modal, Switch, message } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_URL } from '../../utils/helpers';

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
function PostCart({ post, currentUser, setPosts }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading
    const [form] = Form.useForm();
    const [isModalUpdatePostOpen, setIsModalUpdatePostOpen] = useState(false);
    const { id, content, comments, profile_picture, is_anonymous, user } = post;
    const words = content.split(' ');
    const isLongContent = words.length > 50;
    const displayedContent = isExpanded ? content : words.slice(0, 50).join(' ') + '...';

    const handleFormUpdatePost = () => {
      form.validateFields().then(async values => {
        const token = localStorage.getItem("__token__");
        if (!token) {
          console.error("No token found");
          return;
        }
        setLoading(true);
        try {
          const response = await axios.put(
            API_URL + `/posts/update/${id}`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,   
              },
            }
          );
          if (response.data.success) {
            message.success('Post updated successfully!');
            setIsModalUpdatePostOpen(false);
            form.resetFields();
      
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
            message.error(`Error: ${response.data.message}`);
          }
          
        } catch (error) {
          console.error('Error updating post:', error);
          message.error('Failed to update post');
        } finally {
          setLoading(false);
        }
      }).catch(info => {
        console.log('Validate Failed:', info);
        setLoading(false);
      });
    };

    const handleDeletePost = () => {
        message.info('Delete post functionality not implemented yet.');
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
            <Menu.Item key="1" onClick={showUpdateModal}>
                Update Post
            </Menu.Item>
            <Menu.Item key="2" onClick={handleDeletePost}>
                Delete Post
            </Menu.Item>
        </Menu>
    );
    return (
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
        {/* Modal for update post */}
        <Modal
          title="Update Post"
          open={isModalUpdatePostOpen}
          onCancel={() => setIsModalUpdatePostOpen(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalUpdatePostOpen(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleFormUpdatePost} loading={loading} >
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
        <div 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{marginRight:"1rem"}}
                      size={40} 
                      src={user.profile_picture}
                      alt={user.name}
                  />
            <p><strong>{is_anonymous ? 'Anonymous' : user.name}</strong></p>
          </div>
          {user?.id === currentUser?.id && (
            <Dropdown overlay={menu} trigger={['click']}>
              <EllipsisOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
            </Dropdown>
          )}
        </div>
        <PostContent>
          <p style={{marginBottom:'0', }}>{displayedContent}</p>
          {isLongContent && (
          <Button style={{padding:'0'}} type="link" onClick={() => setIsExpanded(!isExpanded)}> {isExpanded ? 'Thu gọn' : 'Read More'}</Button>
          )}
        </PostContent>
        <div style={{ marginTop: '20px', display:'flex', gap:'10px' }}>
            <HeartOutlined style={{
              fontSize: '32px',
            }} />
            <CommentOutlined style={{
              fontSize: '32px',
            }}/>
        </div>
        <span style={{ marginLeft: '8px' }}>{post.like_count} lượt thích</span>
      </div>
    );
}

export default PostCart;

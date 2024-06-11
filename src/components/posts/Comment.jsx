import React, { useState } from 'react';
import { Avatar, Button, Col, Row, Input, Form } from 'antd';
import { UserOutlined, MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';
import { API_URL } from '../../utils/helpers';

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:10px;
`;

const Comment = ({ comment, postId, fetchComments }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('__token__');
      const response = await axios.post(`${API_URL}/comments`, {
        post_id: postId,
        content: replyContent,
        parent_id: comment.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setReplyContent('');
        setShowReply(false);
        fetchComments();
      }
    } catch (error) {
      console.error('Error replying to comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContent>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Col lg={1} xs={3}>
          <Avatar size={40} src={comment.user.profile_picture} alt={comment.user.name} />
        </Col>
        <Col>
          <Row style={{ padding: '0.5em', margin: '0px 10px 0px 10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '0.5em ' }}>
            <Col xs={23}>
              <strong>{comment.user.name}</strong>
              <p style={{ marginBottom: '0px' }}>{comment.content}</p>
            </Col>
            <Col xs={1}>
              <MoreOutlined />
            </Col>
          </Row>
          <Row>
            <Button type='link' onClick={() => setShowReply(!showReply)}>Reply</Button>
            {showReply && (
              <Form>
                <Form.Item>
                  <Input value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' onClick={handleReply} loading={loading}>Submit</Button>
                </Form.Item>
              </Form>
            )}
          </Row>
        </Col>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ marginLeft: '3rem' }}>
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} postId={postId} fetchComments={fetchComments} />
          ))}
        </div>
      )}
    </CommentContent>
  );
};

export default Comment;

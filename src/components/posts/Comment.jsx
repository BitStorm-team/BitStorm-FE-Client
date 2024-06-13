import React, { useState } from 'react';
import { Avatar, Button, Col, Dropdown, Input, Menu, Modal, Row, Tooltip, message } from 'antd';
import { MoreOutlined, SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getUser } from '../../api';
import { updateCommentApi, deleteCommentApi } from '../../api/comment';
import CommentInput from './CommentInput';

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CommentText = styled.div`
  margin: 0 10px;
  padding: 0.5em;
  background-color: #f9f9f9;
  border-radius: 0.5em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ReplyContainer = styled.div`
  margin-left: 1.5rem;
  align-items: flex-start;
  margin-top: 10px;
`;

const ReplyButton = styled(Button)`
  padding: 0px;
`;

const CommentTextarea = styled(Input.TextArea)`
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
`;

const SendButton = styled(Button)`
  margin-top: auto;
`;

function Comment({ comment, onCommentUpdated, onCommentDeleted }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [replies, setReplies] = useState(comment.replies || []);
  const user = getUser();
  const [isModalDeleteCommentOpen, setIsModalDeleteCommentOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReplyCreated = (newReply) => {
    setReplies([...replies, newReply]);
    setShowReplyInput(false);
  };
  const handleCommentUpdated = (updatedComment) => {
    setReplies(replies.map(comment => comment.id === updatedComment.id ? updatedComment : comment));
  };

  const handleCommentDeleted = (commentId) => {
    setReplies(replies.filter(comment => comment.id !== commentId));
  };
  const handleUpdate = async () => {
    if (!content.trim()) {
      message.error('Content is required');
      return;
    }
    try {
      const updatedComment = {
        content: content.trim(),
      };
      const response = await updateCommentApi(comment.post_id, comment.id, updatedComment);
      console.log(response);
      setShowUpdateInput(false);

      onCommentUpdated(response.data.data);
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCommentApi(comment.post_id, comment.id);
      onCommentDeleted(comment.id);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setShowUpdateInput(true)}>Update comment</Menu.Item>
      <Menu.Item key="2" onClick={() => setIsModalDeleteCommentOpen(true)}>Delete comment</Menu.Item>
    </Menu>
  );

  return (
    <CommentContent>
      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete Post"
        open={isModalDeleteCommentOpen}
        onCancel={() => setIsModalDeleteCommentOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalDeleteCommentOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this comment?</p>
      </Modal>
      <CommentContainer>
        <Avatar size={40} src={comment.user.profile_picture} alt={comment.user.name} />
        <CommentText>
          <Row justify="space-between">
            <Col xs={{ span: 23 }} lg={{ span: 23 }}>
              <strong>{comment.user.name}</strong>
              {showUpdateInput ? (
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <CommentTextarea
                    rows={2}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write a comment..."
                  />
                  <SendButton type="primary" icon={<SendOutlined />} onClick={handleUpdate} />
                </div>
              ) : (
                <p style={{ margin: '5px 0', lineHeight: '1.4' }}>{comment.content}</p>
              )}
            </Col>
            <Col xs={{ span: 1 }} lg={{ span: 1 }}>
              {user?.id === comment.user.id && (
                <Tooltip title="More options">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <MoreOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                  </Dropdown>
                </Tooltip>
              )}
            </Col>
          </Row>
          {!showUpdateInput && (
            <Row>
              <Col>
                <ReplyButton type='link' onClick={() => setShowReplyInput(!showReplyInput)}>Reply</ReplyButton>
              </Col>
            </Row>
          )}
          {showReplyInput && (
            <CommentInput
              postId={comment.post_id}
              parentId={comment.id}
              onCommentCreated={handleReplyCreated}
            />
          )}
        </CommentText>
      </CommentContainer>
      {replies.length > 0 && (
        <ReplyContainer>
          {replies.map(reply => (
            <Comment key={reply.id} comment={reply} onCommentUpdated={handleCommentUpdated} onCommentDeleted={handleCommentDeleted} />
          ))}
        </ReplyContainer>
      )}
    </CommentContent>
  );
}

export default Comment;
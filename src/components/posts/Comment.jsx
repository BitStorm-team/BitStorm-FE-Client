import React, { useState, useEffect } from 'react';
import { Avatar, Button, Col, Dropdown, Menu, Row, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getUser, getUserProfile } from '../../api';
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
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
`;

const ReplyButton = styled(Button)`
  padding: 0px;
`;

const menu = (
  <Menu>
    <Menu.Item key="1">
      Update comment
    </Menu.Item>
    <Menu.Item key="2">
      Delete comment
    </Menu.Item>
  </Menu>
);

function Comment({ comment }) {
  const [userProfile, setUserProfile] = useState(null);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const user = getUser();
  const handleReplyCreated = (newReply) => {
    setReplies([...replies, newReply]);
    setShowReplyInput(false);
  };
  return (
    <CommentContent>
      <CommentContainer>
        <Avatar size={40} src={user.profile_picture} alt={user.name} />
        <CommentText>
          <Row justify="space-between">
            <Col xs={{ span: 23 }} lg={{ span: 23 }}>
              <strong>{comment.user.name}</strong>
              <p style={{ margin: '5px 0', lineHeight: '1.4' }}>{comment.content}</p>
            </Col>
            <Col xs={{ span: 1 }} lg={{ span: 1 }}>
              {userProfile?.id === comment.user.id && (
                <Tooltip title="More options">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <MoreOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                  </Dropdown>
                </Tooltip>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <ReplyButton type='link' onClick={() => setShowReplyInput(!showReplyInput)}>Reply</ReplyButton>
            </Col>
          </Row>
          {showReplyInput && (
            <CommentInput 
              postId={comment.post_id}
              parentId={comment.id}
              onCommentCreated={handleReplyCreated}
            />
          )}
        </CommentText>
      </CommentContainer>
      {comment.replies   && (
        <ReplyContainer>
          {comment.replies.map(reply => (
            <div key={reply.id}>
              <Reply reply={reply} />
              {reply.replies && reply.replies.map(subReply => (
                <div key={subReply.id} style={{ marginLeft: '1.5rem', marginBottom: '10px' }}>
                  <Reply reply={subReply}  />
                </div>
              ))}
            </div>
          ))}
        </ReplyContainer>
      )}
    </CommentContent>
  );
};

const Reply = ({ reply, userProfile }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState(reply.replies || []);
  const user = getUser();
  const handleReplyCreated = (newReply) => {
    setReplies([...replies, newReply]);
    setShowReplyInput(false);
  };
  return (
    <ReplyContainer>
      <Avatar size={30} src={user.profile_picture} alt={user.name} />
      <CommentText>
        <Row justify="space-between">
          <Col xs={{ span: 23 }} lg={{ span: 23 }}>
            <strong>{reply.user.name}</strong>
            <p style={{ margin: '5px 0', lineHeight: '1.4' }}>{reply.content}</p>
          </Col>
          <Col xs={{ span: 1 }} lg={{ span: 1 }}>
            {userProfile?.id === reply.user.id && (
              <Dropdown overlay={menu} trigger={['click']}>
                <MoreOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
              </Dropdown>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <ReplyButton type='link' onClick={() => setShowReplyInput(!showReplyInput)}>Reply</ReplyButton>
          </Col>
        </Row>
        {showReplyInput && (
          <CommentInput 
            postId={reply.post_id}
            parentId={reply.id}
            onCommentCreated={handleReplyCreated}
            user={userProfile}
          />
        )}
      </CommentText>
    </ReplyContainer>
  );
};

export default Comment;

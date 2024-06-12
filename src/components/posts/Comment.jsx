import React, { useState, useEffect } from 'react';
import { Avatar, Button, Col, Dropdown, Menu, Row, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getUserProfile } from '../../api';

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
      Update Post
    </Menu.Item>
    <Menu.Item key="2">
      Delete Post
    </Menu.Item>
  </Menu>
);

function Comment({ comment }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserProfile(userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <CommentContent>
      <CommentContainer>
        <Avatar size={40} src={comment.user.profile_picture} alt={comment.user.name} />
        <CommentText>
          <Row justify="space-between">
            <Col xs={{ span: 23 }} lg={{ span: 23 }}>
              <strong>{comment.user.name}</strong>
              <p style={{ margin: '5px 0', lineHeight: '1.4' }}>{comment.content}</p>
            </Col>
            <Col xs={{ span: 1 }} lg={{ span: 1 }}>
              {userProfile?.id === comment.user.id && (
                <Tooltip title="More options">
                  <MoreOutlined />
                </Tooltip>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <ReplyButton type='link'>Reply</ReplyButton>
            </Col>
          </Row>
        </CommentText>
      </CommentContainer>
      {comment.replies && (
        <ReplyContainer>
          {comment.replies.map(reply => (
            <div key={reply.id}>
              <Reply reply={reply} userProfile={userProfile} />
              {reply.replies && reply.replies.map(subReply => (
                <div key={subReply.id} style={{ marginLeft: '1.5rem', marginBottom: '10px' }}>
                  <Reply reply={subReply} userProfile={userProfile} />
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
  return (
    <ReplyContainer>
      <Avatar size={30} src={reply.user.profile_picture} alt={reply.user.name} />
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
            <ReplyButton type='link'>Reply</ReplyButton>
          </Col>
        </Row>
      </CommentText>
    </ReplyContainer>
  );
};

export default Comment;

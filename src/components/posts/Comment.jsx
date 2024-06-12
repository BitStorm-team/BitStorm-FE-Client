import React from 'react';
import { Avatar, Button, Col, Row, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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
    margin-top: 5px;
  `;
const Comment = ({ comment }) => {
  return (
    <CommentContent>
      <CommentContainer>
        <Avatar size={40} src={comment.user.profile_picture} alt={comment.user.name} />
        <CommentText>
          <strong>{comment.user.name}</strong>
          <p style={{ margin: '5px 0', lineHeight: '1.4' }}>{comment.content}</p>
          <Row justify="space-between">
            <Col>
              <Tooltip title="More options">
                <MoreOutlined />
              </Tooltip>
            </Col>
            <Col>
              <ReplyButton type='link'>Reply</ReplyButton>
            </Col>
          </Row>
        </CommentText>
      </CommentContainer>
      {comment.replies && (
        <ReplyContainer>
          {comment.replies.map(reply => (
            <Reply key={reply.id} reply={reply}/>
          ))}
        </ReplyContainer>
      )}
    </CommentContent>
  );
};

const Reply = ({ reply }) => {
  return (
    <ReplyContainer>
      <Avatar size={30} src={reply.user.profile_picture} alt={reply.user.name} />
      <CommentText>
        <strong>{reply.user.name}</strong>
        <p style={{ margin: '5px 0', lineHeight: '1.4' }}>{reply.content}</p>
        <Row justify="space-between">
          <Col>
            <Tooltip title="More options">
              <MoreOutlined />
            </Tooltip>
          </Col>
        </Row>
      </CommentText>
    </ReplyContainer>
  );
};


export default Comment;

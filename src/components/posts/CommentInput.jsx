import React, { useEffect, useState } from 'react';
import { Avatar, Button, Input, Row, Col } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { createCommentApi } from '../../api/comment';
import { getUser} from '../../api';

const CommentInputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
`;

const CommentTextarea = styled(Input.TextArea)`
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
`;

const SendButton = styled(Button)`
  margin-top: auto;
`;

function CommentInput({ postId, parentId, onCommentCreated }) {
 const user=getUser();
  const [content, setContent] = useState('');

  const handleSend = async () => {
    if (!content.trim()) return;
    try {
      const commentData = {
        parent_id: parentId,
        content: content.trim()
      };
      const response = await createCommentApi(postId, commentData);
      onCommentCreated(response.data);
      setContent('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  return (
    <CommentInputContainer>
      <Avatar size={40} src={user.profile_picture} alt={user.name} />
      <CommentTextarea
        rows={2}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write a comment..."
      />
      <SendButton type="primary" icon={<SendOutlined />} onClick={handleSend} />
    </CommentInputContainer>
  );
}

export default CommentInput;

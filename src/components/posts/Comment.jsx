import React, { useState } from 'react';
import { Avatar, Button, Col, Row, Tooltip } from 'antd';
import { UserOutlined, MoreOutlined, Modal } from '@ant-design/icons';
import styled from 'styled-components';

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:10px;
`;

const Comment = ({ comment }) => {
  return (

      <CommentContent>
        <div style={{ display: 'flex', justifyContent: 'start' }}>
            <Col lg={1} xs={3}>
                <Avatar
                    size={40}
                    src={comment.user.profile_picture}
                    alt={comment.user.name}
                />
            </Col>
            <Col>
                <Row style={{ padding:'0.5em', margin: '0px 10px 0px 10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius:'0.5em ' }}>
                    <Col xs={23}>

                        <strong>{comment.user.name}</strong>
                        <p style={{marginBottom:'0px'}}>{comment.content}</p>
                    </Col>
                    <Col xs={1}>
                        <MoreOutlined />
                    </Col>
                </Row>
                <Row>
                    <Button type='link'>Reply</Button>
                </Row>
            </Col>

        </div>
      </CommentContent>
  );
};
export default Comment;
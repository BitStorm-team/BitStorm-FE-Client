import { CommentOutlined, HeartTwoTone, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
const PostContent = styled.div`
  margin-left: 10px;
`;
function PostCart({ post }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const {content,comments,profile_picture,name,is_anonymous,user}=post;
    const words = content.split(' ');
    const isLongContent = words.length > 50;
    const displayedContent = isExpanded ? content : words.slice(0, 50).join(' ') + '...';
    
    return (
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
        <div 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
        >
          <Avatar style={{marginRight:"1rem"}}
                    size={40} 
                    src={user.profile_picture}
                    alt={user.name}
                />
          <p><strong>{is_anonymous ? 'Ẩn danh' : user.name}</strong></p>
        </div>
        <PostContent>
          <p style={{marginBottom:'0', }}>{displayedContent}</p>
          {isLongContent && (
          <Button stye={{padding:'0'}} type="link" onClick={() => setIsExpanded(!isExpanded)}> {isExpanded ? 'Thu gọn' : 'Read More'}</Button>
          )}
        </PostContent>
        <div style={{ marginTop: '20px', display:'flex', gap:'10px' }}>
            <HeartTwoTone style={{
              fontSize: '32px',
            }} twoToneColor="#eb2f96"/>
            <CommentOutlined style={{
              fontSize: '32px',
            }}/>
        </div>
        <span style={{ marginLeft: '8px' }}>{post.like_count} lượt thích</span>
      </div>
    );
  }

export default PostCart;
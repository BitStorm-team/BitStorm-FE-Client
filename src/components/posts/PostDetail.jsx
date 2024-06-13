import React, { useState, useMemo } from 'react';
import { Avatar, Button, Modal } from "antd";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

function PostDetail({ post, isModalPostDetailOpen, setIsModalPostDetailOpen}){
    const [isExpanded, setIsExpanded] = useState(false);
    // const comments = useMemo(() => post.comments || [], [post.comments]);
    const [comments, setComments] = useState(post.comments || []);
    const words = post.content.split(' ');
    const isLongContent = words.length > 50;
    const displayedContent = isExpanded ? post.content : words.slice(0, 50).join(' ');

    const handleCommentCreated = (newComment) => {
        setComments([...comments, newComment]);
      };
    return(
        <>
            <Modal
                title="Post Detail"
                open={isModalPostDetailOpen}
                onCancel={() => setIsModalPostDetailOpen(false)}
                footer={[
                null
                ]}
            >
                <div>   
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar style={{marginRight:"1rem"}} size={40} src={post.user.profile_picture} alt={post.user.name}/>
                            <p><strong>{post.is_anonymous ? 'Anonymous' : post.user.name}</strong></p>
                        </div>
                        <p style={{marginBottom:'0', }}>{displayedContent}</p>
                        {isLongContent && (
                        <Button style={{padding:'0'}} type="link" onClick={() => setIsExpanded(!isExpanded)}> {isExpanded ? 'Show less' : 'Show More'}</Button>
                        )}
                        <hr />
                    </div>
                    <div>
                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment}/>
                        ))}
                    </div>
                    <CommentInput 
                    postId={post.id}
                    parentId={null}
                    onCommentCreated={handleCommentCreated}
                    />
                </div>
            </Modal>
        </>
    )
}
export default PostDetail;
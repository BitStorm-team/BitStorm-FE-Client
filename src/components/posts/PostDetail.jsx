import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal } from "antd";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { getCommentApi } from '../../api/comment';

function PostDetail({ post, isModalPostDetailOpen, setIsModalPostDetailOpen}){
    const [isExpanded, setIsExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        try {
            setLoading(false);
            const response = await getCommentApi(post.id);
            setComments(response.data.data.comments);
            } catch (error) {
            console.error("Failed to fetch comments:", error);
        }finally{
            setLoading(true);
        }
      };
    
      useEffect(() => {
        if (isModalPostDetailOpen) {
          fetchComments();
        }
      }, [isModalPostDetailOpen]);

    // useEffect(() => {
    // setComments(post.comments || []);
    // }, [post.comments]);
    
    const words = post.content.split(' ');
    const isLongContent = words.length > 50;
    const displayedContent = isExpanded ? post.content : words.slice(0, 50).join(' ');


    const handleCommentCreated = (newComment) => {
        setComments([...comments, newComment]);
      };
      const handleCommentUpdated = (updatedComment) => {
        setComments(comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment));
      };
    
      const handleCommentDeleted = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
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
                            <Comment key={comment.id} comment={comment} onCommentUpdated={handleCommentUpdated}
                            onCommentDeleted={handleCommentDeleted}/>
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
import { Avatar, Button, Form, Modal, message } from "antd";
import Comment from "./Comment";
import { useEffect, useMemo, useState } from "react";
import CommentInput from "./CommentInput";

function PostDetail({ post, isModalPostDetailOpen, setIsModalPostDetailOpen}){
    const [isExpanded, setIsExpanded] = useState(false);
    const words = post.content.split(' ');
    const isLongContent = words.length > 50;
    const displayedContent = isExpanded ? post.content : words.slice(0, 50).join(' ');
    const comments = useMemo(() => post.comments || [], [post.comments]);
    const [replies, setReplies] = useState([]);
    const handleReplyCreated = (newReply) => {
    setReplies([...replies, newReply]);
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
                    onCommentCreated={handleReplyCreated}
                    />
                </div>
            </Modal>
        </>
    )
}
export default PostDetail;
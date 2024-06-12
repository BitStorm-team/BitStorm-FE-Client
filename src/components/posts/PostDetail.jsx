import { Avatar, Button, Form, Modal, message } from "antd";
import PostCart from "./PostCart";
import Comment from "./Comment";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/helpers";
import { getUserProfile } from "../../api";

function PostDetail({ post, isModalPostDetailOpen, setIsModalPostDetailOpen}){
    const [isExpanded, setIsExpanded] = useState(false);
    const words = post.content.split(' ');
    const isLongContent = words.length > 50;
    const displayedContent = isExpanded ? post.content : words.slice(0, 50).join(' ');
    const comments = useMemo(() => post.comments || [], [post.comments]);
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
                    {/* <p>By: {post.is_anonymous ? 'Anonymous' : post.user.name}</p> */}
                    <div>
                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment}/>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default PostDetail;
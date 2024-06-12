import { Button, Form, Modal, message } from "antd";
import PostCart from "./PostCart";
import Comment from "./Comment";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/helpers";

function PostDetail({ post, isModalPostDetailOpen, setIsModalPostDetailOpen }){
    const [isExpanded, setIsExpanded] = useState(false);
    const words = post.content.split(' ');
    const isLongContent = words.length > 50;
    const displayedContent = isExpanded ? post.content : words.slice(0, 50).join(' ');
    const comments = useMemo(() => post.comments || [], [post.comments]);
    // const renderComments = (comments) => {
    //     return comments.map((comment) => (
    //         <Comment key={comment.id} comment={comment}>
    //            {comment.replies && comment.replies.length > 0 && renderComments(comment.replies)}
    //         </Comment>
    //     ));
    // };
    // console.log(post);
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
                    <p style={{marginBottom:'0', }}>{displayedContent}</p>
                    {isLongContent && (
                    <Button style={{padding:'0'}} type="link" onClick={() => setIsExpanded(!isExpanded)}> {isExpanded ? 'Show less' : 'Show More'}</Button>
                    )}
                </div>
                    <p>By: {post.is_anonymous ? 'Anonymous' : post.user.name}</p>
                    <div>
                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default PostDetail;
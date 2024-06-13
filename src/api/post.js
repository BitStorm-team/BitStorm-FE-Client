import axios from "axios";
import { API_URL } from "../utils/helpers";
import { message } from "antd";
let  postDetails = null;
export const setPostDetais = (postInfor) => {postDetails= postInfor};
export const getPostDetails =()=>{
  return postDetails;
}
export const getAllPostsApi= async()=>{
    const token = localStorage.getItem("__token__");
        if (!token) {
          console.error("No token found");
          return;
        }
        try {
            const response = await axios.get(`${API_URL}/posts`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            return response;
        } catch (error) {
        console.error("Error fetching posts:", error);
        message.error("Failed to fetch posts");
        }
};
export const deletePostApi= async(id)=>{
    const token = localStorage.getItem("__token__");
    try {
        const response = await axios.delete(
          API_URL + `/posts/delete/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
       
        return response;
      } catch (error) {
        console.error("Error delete post:", error); 
        message.error( "Failed to delete post");
      }
};
  export const getOnePostApi=async(postId)=>{
  const token = localStorage.getItem("__token__");
        if (!token) {
          console.error("No token found");
          return;
        }
        try {
            const response = await axios.get(`${API_URL}/posts/${postId}/comments`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            setPostDetais(response);
            return response;
        } catch (error) {
        console.error("Error fetching posts:", error);
        message.error("Failed to fetch posts");
        }
}
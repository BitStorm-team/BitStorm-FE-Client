import axios from "axios";
import { API_URL } from "../utils/helpers";
import { message } from "antd";
let  postDetails = null;
export const setPostDetais = (postInfor) => {postDetails= postInfor};
export const getPostDetails =()=>{
  return postDetails;
}
const token = localStorage.getItem("__token__");
export const getAllPostsApi= async()=>{
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
    // console.log('id post to delete' + id);
    try {
        const response = await axios.delete(
          API_URL + `/posts/delete/${id}`,
          {
            headers: {
              "Content-Type" : "application/json",
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
        try {
            const response = await axios.get(`${API_URL}/posts/${postId}/comments`, {
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
}
// Kiểm tra xem bài viết đã được người dùng like hay chưa
export const checkIsLikedApi = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/is-liked`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking like status:', error);
    throw error;
  }
};

export const likePostApi = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error liking the post:', error);
    throw error;
  }
};

export const unlikePostApi = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}/unlike`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error unliking the post:', error);
    throw error;
  }
};
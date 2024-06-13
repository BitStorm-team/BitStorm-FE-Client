import axios from "axios";
import { API_URL } from "../utils/helpers";

export const createCommentApi = async (postId, commentData) => {
    const token = localStorage.getItem("__token__");
    return axios.post(`${API_URL}/posts/${postId}/comments/create`,
         commentData, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
};

export const updateCommentApi = async (postId, commentId, commentData) => {
    const token = localStorage.getItem("__token__");
    return axios.post(`${API_URL}/posts/${postId}/comments/update/${commentId}`, commentData, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
};

export const deleteCommentApi = async (postId, commentId) => {
    const token = localStorage.getItem("__token__");
    return axios.delete(`${API_URL}/posts/${postId}/comments/delete/${commentId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
};
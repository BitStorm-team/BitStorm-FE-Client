// api.js
import axios from "axios";
import { API_URL, headerAPI } from "../utils/helpers";
import { message } from "antd";
// api.js
const api = axios.create({
  baseURL: API_URL, // Thay thế bằng URL thực tế của bạn
  withCredentials: true,
});

export const fetchCsrfToken = async () => {
  try {
    const response = await api.get("/csrf-token");
    return response.data.csrf_token;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};

export const signIn = async (values, csrfToken) => {
  try {
    const response = await api.post("/auth/login", values, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data, navigate) => { // Pass 'navigate' as a parameter
  try {
    // First attempt with the primary URL
    const response = await axios.post(`${API_URL}/auth/register`, data, {
      withCredentials: true,
    });
    console.log("Response:", response.data);
    setTimeout(() => {
      navigate("/signin"); // Use 'navigate' passed as a parameter
    }, 3000);
    message.success("Registration successful");
  } catch (error) {
    console.error("Primary server error:", error);
    throw(error);
  }
};


export const getUserProfile = async () => {
  const header = headerAPI();
  const apiUrl = `${API_URL}/auth/user-profile`;

  try {
    // First attempt with the primary URL
    const response = await api.get(apiUrl, { headers: header });
    return response.data;
  } catch (error) {
    console.error("Primary server error:", error);
    throw(error);
  }
};

export const getExpertProfile = async (userId) => {
  const header = headerAPI();
  const apiUrl = `${API_URL}/experts/profile/${userId}`;
  try {
    const response = await api.get(apiUrl, { headers: header });
    return response.data;
  } catch (error) {
    throw error;
  }
};
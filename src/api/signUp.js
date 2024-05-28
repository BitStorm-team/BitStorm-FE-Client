import axios from "axios"; // Ensure axios is imported
import { message } from "antd";
import { Navigate } from "react-router-dom"; // Import Navigate from react-router-dom
import { API_URL, API_URL_BACKUP } from "../utils/helpers";

const signUp = async (data, navigate) => { // Pass 'navigate' as a parameter
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

export default signUp;

import axios from "axios"; // Ensure axios is imported
import { message } from "antd";
import { Navigate } from "react-router-dom"; // Import Navigate from react-router-dom
import { API_URL } from "../utils/helpers";

const signUp = async (data, navigate) => { // Pass 'navigate' as a parameter
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data, {
      withCredentials: true,
    });
    console.log("Response:", response.data);
    setTimeout(() => {
      navigate("/signin"); // Use 'navigate' passed as a parameter
    }, 3000);
    message.success("Registration successful");
  } catch (error) {
    console.error("Error:", error);
    message.error("Registration failed");
  }
};

export default signUp;

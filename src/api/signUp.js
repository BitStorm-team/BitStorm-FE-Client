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

    try {
      // Attempt with the backup URL
      const responseBackup = await axios.post(`${API_URL_BACKUP}/auth/register`, data, {
        withCredentials: true,
      });
      console.log("Response from backup:", responseBackup.data);
      navigate("/signin"); // Use 'navigate' passed as a parameter
      message.success("Registration successful");
    } catch (backupError) {
      console.error("Backup server error:", backupError);
      message.error("Registration failed");
    }
  }
};

export default signUp;

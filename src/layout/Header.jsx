import { Avatar, Button } from "antd";
import Logo from "../components/Logo";
import NavBar from "./NavBar";
import "../assets/css/header.css";
import { useState, useEffect } from "react";
import { getStorage } from "../utils/helpers";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Corrected import

const MainHeader = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("__token__");
    if (storedToken) {
      setToken(storedToken);
      setIsLogin(true); // Set isLogin to true if token exists
      const decodedToken = jwtDecode(storedToken); // Use jwtDecode correctly
      setUserInfo(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.sub) {
      getUser();
    }
  }, [userInfo, token]); // Add userInfo and token as dependencies

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/experts/profile/${userInfo.sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      setUserProfile(response.data.data); // Assuming response.data.data contains the user profile
    } catch (error) {
      localStorage.setItem("permission", true);
      // handleLogout();
    }
  };

  return (
    <header className="main-header">
      <div className="header-section logo">
        <Logo />
      </div>
      <div className="header-section navbar">
        <NavBar />
      </div>
      <div className="header-section buttons">
        {!isLogin ? (
          <>
            <Button type="primary">Sign In</Button>
            <Button type="primary">Sign Up</Button>
          </>
        ) : (
          <Avatar
            size={60}
            src={userProfile?.profile_picture} // Use optional chaining
            icon={<UserOutlined />}
          />
        )}
      </div>
    </header>
  );
};

export default MainHeader;

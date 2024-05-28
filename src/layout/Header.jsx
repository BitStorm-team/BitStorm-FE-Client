import { Avatar, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../components/Logo";
import NavBar from "./NavBar";
import "../assets/css/header.css";
import { useEffect, useState } from "react";
import { API_URL, API_URL_BACKUP, headerAPI } from "../utils/helpers";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Corrected import
import { getExpertProfile, getUserProfile } from "../api";

const MainHeader = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("__token__");
    if (storedToken) {
      setToken(storedToken);
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    } else {
      localStorage.removeItem("permission");
    }
  }, [token]);

  useEffect(() => {
    if (userInfo && userInfo.sub) {
      getUser();
    }
  }, [userInfo]);

  const getUser = async () => {
    try {
      const userProfileData = await getUserProfile();
      setUserProfile(userProfileData);
      if (userProfileData.role_id === 3) {
        getExpert();
      }
    } catch (error) {
      console.error("Error getting user profile:", error);
      handleLogout();
    }
  };

  const getExpert = async () => {
    try {
      const expertProfileData = await getExpertProfile(userInfo.sub);
      setUserProfile(expertProfileData.data);
    } catch (error) {
      console.error("Error getting expert profile:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("__token__");
    localStorage.removeItem("expires_in");
    navigate("/signin");
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
            <Button type="primary">
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button type="primary">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              size={60}
              src={userProfile?.profile_picture} // Use optional chaining
              icon={<UserOutlined />}
            />
            <Button danger onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;

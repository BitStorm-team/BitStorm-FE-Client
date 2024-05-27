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

const MainHeader = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedToken = localStorage.getItem("__token__");
    if (storedToken) {
      setToken(storedToken);
      setIsLogin(true); // Set isLogin to true if token exists
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token); // Use jwtDecode correctly
      setUserInfo(decodedToken);
    } else {
      localStorage.removeItem("permission");
    }
  }, [token]); // Add token as a dependency

  useEffect(() => {
    if (userInfo && userInfo.sub) {
      getUser();
    }
  }, [userInfo]); // Add userInfo as a dependency

  const getUser = async () => {
    const header = headerAPI();
    const apiUrl = `${API_URL}/auth/user-profile`;
    const apiUrlBackup = `${API_URL_BACKUP}/auth/user-profile`;

    try {
      // First attempt with the primary URL
      const response = await axios.get(apiUrl, {
        headers: header,
      });
      if (response.data.role_id === 3) {
        getExpert();
      }
      setUserProfile(response.data); // Assuming response.data contains the user profile
    } catch (error) {
      console.error("Primary server error:", error);

      try {
        // Attempt with the backup URL
        const responseBackup = await axios.get(apiUrlBackup, {
          headers: header,
        });
        if (responseBackup.data.role_id === 3) {
          getExpert();
        }
        setUserProfile(responseBackup.data); // Assuming responseBackup.data contains the user profile
      } catch (backupError) {
        console.error("Backup server error:", backupError);
        localStorage.setItem("permission", true);
        handleLogout();
      }
    }
  };

  const getExpert = async () => {
    const header = headerAPI();
    const userId = userInfo.sub;
    const apiUrl = `${API_URL}/experts/profile/${userId}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: header,
      });
      setUserProfile(response.data.data); // Assuming response.data.data contains the expert profile
    } catch (error) {
      handleLogout();
    }
  };

  console.log(userProfile);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("__token__");
    localStorage.removeItem("expires_in");
    navigate("/signin"); // Use navigate instead of window.location.href
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

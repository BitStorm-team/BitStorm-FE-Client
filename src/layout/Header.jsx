import { Avatar, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import NavBar from "./NavBar";
import "../assets/css/header.css";
import { useEffect, useState } from "react";
import { bookCalendar, getExpertProfile, getUserProfile } from "../api";
import { jwtDecode } from "jwt-decode";
import { UserOutlined } from "@ant-design/icons";
import { checkTransactionStatus } from "../utils/helpers";

const MainHeader = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [profileMenuActive, setProfileMenuActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("__token__");
    if (storedToken) {
      setToken(storedToken);
      setIsLogin(true);
    }
    fetchDataAndBook(); // Call the async function immediately
  }, []); // Empty dependency array to run the effect only once

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

  // Call the checkLocalStorage function where appropriate in your code

  const fetchDataAndBook = async () => {
    const currentUrlParams = window.location.search;
    const transaction = checkTransactionStatus(currentUrlParams);
    if (transaction) {
      const dataBooking = JSON.parse(localStorage.getItem("dataBooking"));
      console.log(dataBooking);
      try {
        const bookingSuccess = await bookCalendar(dataBooking);
        if (bookingSuccess) {
          console.log("Booking successful");
          message.success("Booking successful");
          navigate("/");
        } else {
          console.error("Booking failed");
          navigate("/");
        }
      } catch (error) {
        console.error("Error during booking:", error);
        navigate("/");
      }
    } else if (transaction === null) {
      navigate("/");
    } else {
      message.error("Booking failed");
      navigate("/");
    }
  };
  const getUser = async () => {
    try {
      const userProfileData = await getUserProfile();
      if (userProfileData.status === 0) {
        handleLogout();
      }
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

  const toggleNavbarMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleProfileMenu = () => {
    setProfileMenuActive(!profileMenuActive);
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
        <NavBar
          isLogin={isLogin}
          handleLogout={handleLogout}
          menuActive={menuActive}
          setMenuActive={toggleNavbarMenu}
        />
      </div>
      {isLogin && (
        <div className="header-section profile">
          <div className="action">
            <div className="profile" onClick={toggleProfileMenu}>
              <Avatar
                size={60}
                src={userProfile?.profile_picture}
                icon={<UserOutlined />}
              />
            </div>
            <div className={`menu ${profileMenuActive ? "active" : ""}`}>
              <ul>
                <li>
                  <Link to="/profile">My profile</Link>
                </li>
                <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainHeader;

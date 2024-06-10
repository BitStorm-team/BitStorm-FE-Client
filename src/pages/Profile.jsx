import React, { useState, useEffect } from "react";
import Banner from "../components/contact/Banner";
import "../assets/css/profile/index.css";
import UserImage from "../assets/images/hollywooddoctors3.jpg";
import {
  ClockCircleFilled,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import Action from "../components/prrofile/Action";
import Schedule from "../components/prrofile/Schedule";
import HistoryBooking from "../components/prrofile/HistoryBooking";
import { getUserProfile } from "../api";
import axios from "axios";
import { API_URL, headerAPI } from "../utils/helpers.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { message } from "antd";

export default function Profile() {
  const [user, setUser] = useState("user");
  const [userData, setUserData] = useState({});
  const [allSchedules, setAllSchedules] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateCalendarModal, setShowCreateCalendarModal] = useState(false);
  const [header, setHeader] = useState(headerAPI);
  const [describe, setDescribe] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        console.log(data);
        if (data) {
          const loggedInUser = data;
          console.log(loggedInUser);
          if (loggedInUser.role_id === 3) {
            try {
              const expertResponse = await axios.get(
                `${API_URL}/experts/profile/${loggedInUser.id}`,
                { headers: header }
              );
              setUser("expert");
              setUserData(expertResponse.data.data);
              console.log(expertResponse.data.data);
            } catch (error) {
              console.error("Error fetching expert profile", error);
            }

            try {
              const calendarsResponse = await axios.get(
                `${API_URL}/experts/${loggedInUser.id}/calendars`,
                { headers: header }
              );
              setAllSchedules(calendarsResponse.data.data.data);
              console.log(calendarsResponse.data.data.data);
            } catch (error) {
              console.error("Error fetching expert calendars", error);
            }
          } else {
            setUser("user");
            setUserData(loggedInUser);
          }
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const openCreateCalendarModal = () => {
    setShowCreateCalendarModal(true);
    setShowMenu(false);
  };

  const closeDetailModal = () => {
    setShowCreateCalendarModal(false);
  };

  const handleCreateCalendarSubmit = async (e) => {
    e.preventDefault();
    const API = `${API_URL}/experts/calendar`;
    try {
      const response = await axios.post(
        API,
        {
          describe: describe,
          start_time: moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
          end_time: moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
          price: price,
        },
        {
          headers: header,
        }
      );
      message.success(response.data.message || "Send message successfully");
      // Fetch the updated schedules after creating a new one
      const updatedSchedules = await axios.get(
        `${API_URL}/experts/${userData.id}/calendars`,
        { headers: header }
      );
      setAllSchedules(updatedSchedules.data.data.data);
      setShowCreateCalendarModal(false);
    } catch (error) {
      message.error(
        "Contact failed " + (error.response?.data?.message || error.message)
      );
    }
  };
  const handleUpdate = async () => {
    try {
      const updatedSchedules = await axios.get(
        `${API_URL}/experts/${userData.id}/calendars`,
        { headers: header }
      );
      setAllSchedules(updatedSchedules.data.data.data);
    } catch (error) {
      console.error("Error fetching updated schedules", error);
    }
  };
  const schedules = [
    {
      username: "caubecodon",
      date: "30-12-2023",
      time: "13h - 14h",
      price: "300.000",
      link: "20d-405-xdj-dns",
    },
    {
      username: "caubecodon",
      date: "30-12-2023",
      time: "13h - 14h",
      price: "300.000",
      link: "20d-405-xdj-dns",
    },
    {
      username: "caubecodon",
      date: "30-12-2023",
      time: "13h - 14h",
      price: "300.000",
      link: "20d-405-xdj-dns",
    },
  ];

  return (
    <div className="main-profile">
      <Banner
        title="YOUR PROFILE"
        description="We'd love to learn more about you! Please update your profile information below so we can stay connected."
      />
      <div className="profile-container">
        <div className="profile_avtar">
          <div className="img_box">
            <img
              src={userData ? userData.profile_picture : UserImage}
              alt="User Avatar"
            />
          </div>
          <div className="name_box_profile">
            <p>
              Hi{" "}
              <span style={{ color: "#3D93FF" }}>
                {userData ? userData.name : "Loading..."}
              </span>
            </p>
          </div>
        </div>
        <div className="action_box">
          <Action
            icon={<UserOutlined />}
            title="Personal information"
            description="View and edit your personal information..."
            infor={userData}
          />
          <Action
            icon={<ClockCircleFilled />}
            title="Personal activity"
            description="Review the history of your calendars and posts..."
          />
          <Action
            icon={<SettingFilled />}
            title="Personal setting"
            description="Personal information can be edited..."
          />
        </div>
        {user === "user" ? (
          <></>
        ) : (
          <>
            <div className="btn_create_schedule">
              <button
                className="btn_create_schedule_btn"
                onClick={openCreateCalendarModal}
              >
                Create a new schedule
              </button>
            </div>
            <div className="examination_schedule_box">
              <h5>Your examination schedule</h5>
              <div className="schedule_item_box">
                {Array.isArray(allSchedules) && allSchedules.length === 0 ? (
                  <></>
                ) : (
                  allSchedules.map((schedule) => (
                    <Schedule
                      key={schedule.id}
                      schedule={schedule}
                      onUpdate={handleUpdate}
                    />
                  ))
                )}
              </div>
            </div>
          </>
        )}
        <div className="examination_booking_history">
          <h5>Scheduled medical appointments</h5>
          <div className="booking_history_item">
            {schedules.map((schedule, index) => (
              <HistoryBooking
                key={index}
                username={schedule.username}
                date={schedule.date}
                time={schedule.time}
                price={schedule.price}
                link={schedule.link}
              />
            ))}
          </div>
        </div>
        {showCreateCalendarModal && (
          <div className="modal-overlay">
            <div className="modal createCalendarForm">
              <div className="modal-content">
                <span className="close" onClick={closeDetailModal}>
                  &times;
                </span>
                <h2>Let create new schedule</h2>
                <form onSubmit={handleCreateCalendarSubmit}>
                  <div style={{ display: "flex" }}>
                    <label>Describe:</label>
                    <textarea
                      type="textarea"
                      value={describe}
                      onChange={(e) => setDescribe(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Start Time:</label>
                    <DatePicker
                      className="input-date-profile"
                      style={{
                        backgroundColor: "dark",
                      }}
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      timeFormat="HH:mm"
                      timeIntervals={30}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>End Time:</label>
                    <DatePicker
                      className="input-date-profile"
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      timeFormat="HH:mm"
                      timeIntervals={30}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Price:</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

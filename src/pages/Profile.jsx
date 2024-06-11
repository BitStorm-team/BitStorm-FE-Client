import React, { useState, useEffect } from "react";
import Banner from "../components/contact/Banner";
import "../assets/css/profile/index.css";
import UserImage from "../assets/images/loading_image.webp";
import {
  ClockCircleFilled,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import Action from "../components/profile/Action";
import Schedule from "../components/profile/Schedule";
import HistoryBooking from "../components/profile/HistoryBooking";
import { getAllBooking, getAllBookingExpert, getUserProfile } from "../api";
import axios from "axios";
import { API_URL, headerAPI } from "../utils/helpers.js";
import { DatePicker } from "antd";
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
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        console.log(data);
        setUserId(data.id);
        setUserInformation((prev) => ({ ...prev, ...data }));
        if (data) {
          const loggedInUser = data;
          console.log('user' + loggedInUser);

          if (loggedInUser.role_id === 3) {
            try {
              const expertResponse = await axios.get(
                `${API_URL}/experts/profile/${loggedInUser.id}`,
                { headers: header }
              );

              setUser("expert");
              setUserData(expertResponse.data.data);
              console.log('expert' + expertResponse.data.data);
              setLoading(false);
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
  }, [userId]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userInformation.id) return; // Ensure userInformation.id is available
      try {
        console.log('User ID:', userId);
        let bookingsData;
        if (userInformation.role_id === 3) {
          bookingsData = await getAllBookingExpert(userInformation.id);
        } else {
          bookingsData = await getAllBooking(userInformation.id);
        }
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userInformation]); // Dependency array updated to include userInformation

  console.log("bookings", bookings);

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
              src={!loading ? userData.profile_picture : UserImage}
              alt="User Avatar"
            />
          </div>
          <div className="name_box_profile">
            <p>
              Hi{" "}
              <span style={{ color: "#3D93FF" }}>
                {!loading ? userData.name : "Loading..."}
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
          {!loading ? (
            bookings.length !== 0 ? (
              <div className="booking_history_item">
                {bookings.map((booking, index) => (
                  <HistoryBooking
                    key={index}
                    userImage={booking.user.profile_picture}
                    date={booking.calendar.created_at}
                    startTime={booking.calendar.start_time}
                    endTime={booking.calendar.end_time}
                    price={booking.calendar.price}
                    link={booking.link_room}
                    isLoading={loading}
                  />
                ))}
              </div>
            ) : <p>You don't have any booking yet!</p>
          ) : (
            <div className="booking_history_item">
              <p>Loading...</p>
            </div>
          )}
        </div>

        {showCreateCalendarModal && (
          <div
            className="modal-overlay"
            style={{
              marginTop: "50px",
            }}
          >
            <div className="modal createCalendarForm">
              <div className="modal-content">
                <span className="close" onClick={closeDetailModal}>
                  &times;
                </span>
                <h2>Let create new schedule</h2>
                <form onSubmit={handleCreateCalendarSubmit}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <label>Describe:</label>
                    <textarea
                      type="textarea"
                      value={describe}
                      onChange={(e) => setDescribe(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <label>Start Time:</label>
                    <DatePicker
                      className="input-date-profile"
                      selected={startTime}
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(date) =>
                        setStartTime(date ? date.toDate() : null)
                      }
                      showTimeSelect
                      dateFormat="Pp"
                      timeIntervals={30}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <label>End Time:</label>
                    <DatePicker
                      className="input-date-profile"
                      selected={endTime}
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(date) =>
                        setEndTime(date ? date.toDate() : null)
                      }
                      showTimeSelect
                      dateFormat="Pp"
                      timeIntervals={30}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <label>Price:</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Create</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

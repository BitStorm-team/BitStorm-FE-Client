import React, { useState } from "react";
import { FaEllipsisV, FaEye, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/profile/schedule.css";
import axios from "axios";
import moment from "moment";
import { API_URL, headerAPI } from "../../utils/helpers.js";
import { message } from "antd";

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function Schedule({ schedule, onUpdate }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [describe, setDescribe] = useState(schedule.describe || "");
  const [startTime, setStartTime] = useState(new Date(schedule.start_time));
  const [endTime, setEndTime] = useState(new Date(schedule.end_time));
  const [price, setPrice] = useState(schedule.price || "");
  const [header] = useState(headerAPI);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const openDetailModal = () => {
    setShowDetailModal(true);
    setShowMenu(false);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const deleteSchedule = async () => {
    const API = `${API_URL}/experts/calendar/${schedule.id}`;
    // const hideLoading = message.loading("Deleting schedule...", 0);
    try {
      const response = await axios.delete(API, {
        headers: header,
      });
      // hideLoading();
      message.success(response.data.message || "Delete schedule successfully");
      } catch (error) {
        // hideLoading();
        message.error("Delete failed " + (error.response?.data?.message || error.message));
        }
      onUpdate();
  };

  const handleUpdateScheduleSubmit = async (e) => {
    e.preventDefault();
    const API = `${API_URL}/experts/calendar/${schedule.id}`;
    const hideLoading = message.loading("Updating schedule...", 0);
    try {
      const response = await axios.put(
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
      hideLoading();
      message.success(response.data.message || "Update schedule successfully");
      onUpdate();
      setShowDetailModal(false);
    } catch (error) {
      hideLoading();
      message.error("Update failed " + (error.response?.data?.message || error.message));
    }
  };

  const formattedStartTime = formatTime(schedule.start_time);
  const formattedEndTime = formatTime(schedule.end_time);

  return (
    <>
      <div className="card_profile_schedule">
        <div className="card-body">
          <p className={schedule.status === 0 ? "card_title_booked" : "card-title"}>
            {formattedStartTime} - {formattedEndTime}
          </p>
        </div>
        <div className="menu-container">
          <button className="menu-button_profile" onClick={toggleMenu}>
            <FaEllipsisV />
          </button>
          {showMenu && (
            <div className="menu_schedule">
              <button className="detail_shedule" onClick={openDetailModal}>
                <FaEye />
              </button>
              <button className="delete_shedule" onClick={deleteSchedule}>
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>

      {showDetailModal && (
        <div className="modal-overlay">
          <div className="modal createCalendarForm">
            <div className="modal-content">
              <span className="close" onClick={closeDetailModal}>
                &times;
              </span>
              <h2>Update schedule</h2>
              <form onSubmit={handleUpdateScheduleSubmit}>
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
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

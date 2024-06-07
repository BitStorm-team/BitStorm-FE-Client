import React from "react";
import "../../assets/css/profile/historybooking.css";
import UserImage from "../../assets/images/Doctor.jpg";

export default function HistoryBooking({ username, date, time, price, link }) {
  return (
    <div className="schedule-item">
      <div className="booking_image">
        <img src={UserImage} alt="User Avatar" className="user-avatar" />
      </div>
      <div className="schedule-info">
        <p className="username">@{username}</p>
        <p className="schedule-date">
          Đã đặt lịch vào ngày {date} {time}
        </p>
        <p className="schedule-price">{price} đ</p>
        <p className="schedule-link">Link cuộc họp : {link}</p>
      </div>
      <a href={link} className="schedule-link-button">
        Đi đến cuộc họp →
      </a>
    </div>
  );
}

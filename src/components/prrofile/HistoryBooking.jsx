import React from "react";
import { format } from 'date-fns';
import "../../assets/css/profile/historybooking.css";

export default function HistoryBooking({userImage, date , startTime, endTime, price, link, isLoading }) {

  const formatDateTime = (date) => {
    const formattedDate = format(new Date(date), 'dd-MM-yyyy HH:mm:ss');
    return formattedDate;
  }

  if (isLoading) {
    // Render loading state
    return (
      <div className="schedule-item loading">
        <div className="booking_image">
          <div className="loading-avatar" />
        </div>
        <div className="schedule-info loading-info">
          <div className="loading-line" />
          <div className="loading-line" />
          <div className="loading-line" />
          <div className="loading-line" />
        </div>
      </div>
    );
  }

  // Render actual booking information
  return (
    <div className="schedule-item">
      <div className="booking_image">
        <img src={userImage} alt="User Avatar" className="user-avatar" />
      </div>
      <div className="schedule-info">
        <p className="username">Bạn</p>
        <p className="schedule-date">
          Booked on {formatDateTime(date)}
        </p>
        <p className="schedule-date">
          Starts at {formatDateTime(startTime)}
        </p>
        <p className="schedule-date">
          Ends at {formatDateTime(endTime)}
        </p>
        <p className="schedule-price">{price}.000 đ</p>
        <p className="schedule-link">Meeting Link : {link}</p>
      </div>
      <a href={link} className="schedule-link-button">
        Go to Meeting →
      </a>
    </div>
  );
}

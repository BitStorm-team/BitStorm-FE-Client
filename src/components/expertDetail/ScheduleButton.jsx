import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import '../../assets/css/schedule.css'
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ${date.toLocaleDateString([], {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    })}`;
  } else {
    return "";
  }
};

const notificationError = () => {
  message.error('This schedule booked!')
}

export default function ScheduleButton({ start_time, end_time, calendar_id, expert_id, price, status }) {
  const navigate = useNavigate();

  const handleBookingDetail = () => {
    navigate(`/booking/${expert_id}/calendar/${calendar_id}/time/${start_time}/${end_time}/${price}`);
  };

  const formattedStartTime = formatTime(start_time);
  const formattedEndDate = formatDate(end_time);

  return (
    <button
  className={`btnschedule ${status === 0 ? 'btn-danger' : 'btn-info'}`}
  onClick={status === 0 ? notificationError : handleBookingDetail}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style={{ fill: "#007bff", marginRight: 5 }}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 17h-1v-6l4.25-2.54.75 1.23-3.5 2.11z" />
  </svg>
  {formattedStartTime} - {formattedEndDate}
</button>

  );
}


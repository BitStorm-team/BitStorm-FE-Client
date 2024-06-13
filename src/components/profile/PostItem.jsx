import { BellOutlined } from "@ant-design/icons";
import "../../assets/css/profile/action.css";

export default function PostItem({ post }) {
  const date = new Date(post.created_at);
  const currentDate = new Date();
  const formattedDate = date.toLocaleDateString(); // e.g., 6/13/2024
  const currentFormattedDate = currentDate.toLocaleDateString(); // e.g., 6/13/2024

  const isToday = formattedDate === currentFormattedDate;

  return (
    <div className="noti-post-item">
      <span style={{ fontWeight: isToday ? 'bold' : 'normal' }}>
        You created a new post at {formattedDate}
      </span>
      {isToday ? <BellOutlined style={{ color: 'blue' }} /> : <BellOutlined />}
    </div>
  );
}


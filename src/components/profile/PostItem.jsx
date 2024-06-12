import { BellOutlined } from "@ant-design/icons";
import "../../assets/css/profile/action.css";

export default function PostItem({ post }) {
  const date = new Date(post.created_at);
  const formattedDate = date.toLocaleDateString();

  return (
    <div className="noti-post-item">
      <span>You created a new post at {formattedDate}</span>
      <BellOutlined />
    </div>
  );
}

import { Avatar, Button } from "antd";
import User from "../../assets/images/expertDetail/client1.png";
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="#fadb14"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 17.27l-6.18 3.73 1.59-7.02L2.56 9.98l7.08-.61L12 2l2.36 7.37 7.08.61-5.85 4.01 1.59 7.02z" />
  </svg>
);
export default function ExpertDetailReview({content, rating, name, profile_img, time}) {
  return (
    <div className="container_review_content">
      <div className="userAvatar">
        <Avatar size={64} src={profile_img} alt="profile_img" />
      </div>
      <div style={{ marginLeft: 10, flex: 1 }}>
        <p style={{ fontWeight: "bold", marginBottom: 5 }}>{name}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          {Array.from({ length: rating }, (v, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <p style={{ marginBottom: 5 }}>{time}</p>
        <p style={{ marginBottom: 0 }}>{content}</p>
      </div>
    </div>
  );
}

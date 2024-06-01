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
export default function ExpertDetailReview() {
  return (
    <div className="container_review_content">
      <div className="userAvatar">
        <Avatar size={64} src={User} />
      </div>
      <div style={{ marginLeft: 10, flex: 1 }}>
        <p style={{ fontWeight: "bold", marginBottom: 5 }}>BQ</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
        <p style={{ marginBottom: 5 }}>May 2024</p>
        <p style={{ marginBottom: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel metus
          at tellus euismod malesuada. Nulla facilisi. Nulla auctor, lectus et
          suscipit semper, mi sapien laoreet nibh, sit amet laoreet velit tellus
          eget lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          In vel metus at tellus euismod malesuada. Nulla facilisi. Nulla
          auctor, lectus et suscipit semper, mi sapien laoreet nibh, sit amet
          laoreet velit tellus eget lacus.
        </p>
      </div>
    </div>
  );
}

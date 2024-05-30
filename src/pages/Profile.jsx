import Banner from "../components/contact/Banner";
import "../assets/css/profile/index.css";
import UserImage from "../assets/images/hollywooddoctors3.jpg";
import { UserOutlined } from "@ant-design/icons";
import Action from "../components/prrofile/Action";

export default function Profile() {
  return (
    <>
      <Banner
        title="YOUR PROFILE"
        description="We'd love to learn more about you! Please update your profile information below so we can stay connected."
      />
      <div className="profile-container">
        <div className="profile_avtar">
          <div className="img_box">
            <img src={UserImage} alt="User Avatar" />
          </div>
          <div className="name_box_profile">
            <p>
              Hi <span style={{ color: "#3D93FF" }}> Phạm Gia Bảo</span>
            </p>
          </div>
        </div>
        <div className="action_box">
          <Action
            icon={<UserOutlined />}
            title="Personal information"
            description="View and edit your personal information..."
          />
          <Action
            icon={<UserOutlined />}
            title="Personal information"
            description="View and edit your personal information..."
          />
          <Action
            icon={<UserOutlined />}
            title="Personal information"
            description="View and edit your personal information..."
          />
        </div>
      </div>
    </>
  );
}

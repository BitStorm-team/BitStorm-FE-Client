import React from 'react';
import "../assets/css/profile/userProfile.css";
const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-header">
        <img src="https://via.placeholder.com/1500x500" alt="Profile cover" />
        <div className="profile-info">
          <h2>Gia Bảo</h2>
          <p>4,6K bạn bè</p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="button">
          <span className="icon">
            <i className="fas fa-camera"></i>
          </span>
          <span className="text">Chỉnh sửa ảnh bìa</span>
        </button>
        <button className="button">
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span className="text">Thêm vào tin</span>
        </button>
        <button className="button">
          <span className="icon">
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span className="text">Chỉnh sửa trang cá nhân</span>
        </button>
      </div>
      <div className="profile-content">
        {/* Profile content goes here */}
      </div>
    </div>
  );
};

export default Profile;
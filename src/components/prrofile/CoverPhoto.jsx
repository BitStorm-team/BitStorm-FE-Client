import React from 'react';
import '../../assets/css/profile/coverPhoto.css';
import coverImage from '../../assets/images/hinh.png'; // Replace with your image path

const CoverPhoto = () => {
    return (
        <div className="cover-photo">
            <button className="edit-button">Chỉnh sửa ảnh bìa</button>
        </div>
    );
};

export default CoverPhoto;

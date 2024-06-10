import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../assets/css/profile/action.css";
import { API_URL, headerAPI } from "../../utils/helpers";
import { message } from "antd";
import Loading from "../expertDetail/Loading";

export default function Action(props) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [header] = useState(headerAPI);
  const fileInputRef = useRef(null); // Ref để truy cập input file
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (props.infor) {
      setFormData({
        ...props.infor,
        expert: props.infor.expert || {}, // Ensure 'expert' is initialized
      });
    }
  }, [props.infor]);

  const openDetailModal = () => setShowDetailModal(true);
  const closeDetailModal = () => setShowDetailModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExpertChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      expert: {
        ...prevData.expert,
        [name]: value,
      },
    }));
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          expert: {
            ...prevData.expert,
            certificate: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API =
      formData.role_id === 2
        ? `${API_URL}/user/profile`
        : formData.role_id === 3
        ? `${API_URL}/experts/profile`
        : null;

    if (API) {
      try {
        const updateResponse = await axios.patch(
          API,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            expert: formData.expert,
          },
          { headers: header }
        );
        message.success(updateResponse.data.message || "Updated successfully");
      } catch (error) {
        message.error(
          "Update failed " + (error.response?.data?.message || error.message)
        );
      }
    }
    console.log("Form data submitted:", formData);
  };

  const getUrlUpdateUserImg = async (file) => {
    const CLOUD_NAME = "dugeyusti";
    const PRESET_NAME = "expert_upload";
    const FOLDER_NAME = "BitStorm";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch(api, options);
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
       setIsLoading(true);
      try {
        const secureUrl = await getUrlUpdateUserImg(file);
        console.log("File URL from Cloudinary:", secureUrl);
        setImageUrl(secureUrl); // Lưu URL vào state imageUrl
        setFormData((prevState) => ({
          ...prevState,
          profile_picture: secureUrl,
        }));
        setFileList((prevList) => [...prevList, file]); // Lưu file vào fileList nếu cần
      } catch (error) {
        console.error("Error updating user image:", error);
      }
      finally {
        setIsLoading(false); // Kết thúc trạng thái loading
      }
    }
  };
  const handleEditClick = () => {
    fileInputRef.current.click(); // Mở hộp thoại chọn file khi nhấn nút "Edit"
  };

  return (
    <>
      <div
        className="card_profile"
        style={{ width: "18rem" }}
        onClick={openDetailModal}
      >
        <div className="card-body">
          <p className="card-icon">{props.icon}</p>
          <p className="card-title">{props.title}</p>
          <p className="card-text">{props.description}</p>
        </div>
      </div>

      {showDetailModal && (
        <div className="modal-overlay">
          <div className="modal modalOfPersonalInfor">
            <div className="modal-content">
              <span className="close" onClick={closeDetailModal}>
                &times;
              </span>
              {props.infor ? (
                <>
                  <h2>Personal Information</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="avatar-container">
                      {isLoading ? (
                        <div className="loader-container">
                          <div className="loader"></div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={imageUrl || props.infor.profile_picture}
                            alt="Profile"
                            className="profile-picture"
                          />
                          <button
                            type="button"
                            className="edit-button"
                            onClick={handleEditClick}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                    <input
                      type="hidden"
                      name="avatar"
                      id="userAvatar"
                      value={imageUrl || ""}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <div className="input-group">
                      <label>
                        <strong>Name</strong>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group">
                      <label>
                        <strong>Email</strong>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group">
                      <label>
                        <strong>Password</strong>
                      </label>
                      <input
                        type="text"
                        name="password"
                        value={formData.password || "..."}
                        onChange={handleChange}
                      />
                    </div>
                    {formData.role_id === 3 && (
                      <>
                        <div className="input-group">
                          <label>
                            <strong>Experience</strong>
                          </label>
                          <input
                            type="text"
                            name="experience"
                            value={formData.expert?.experience || ""}
                            onChange={handleExpertChange}
                          />
                        </div>
                        <div className="input-group">
                          <label>
                            <strong>Certificate</strong>
                          </label>
                          <input
                            type="file"
                            name="certificate"
                            accept="image/*"
                            onChange={handleCertificateChange}
                            style={{ width: "20%" }}
                          />
                          {formData.expert?.certificate && (
                            <img
                              src={formData.expert.certificate}
                              alt="Certificate"
                              className="certificate-img"
                              style={{ width: "200px" }}
                            />
                          )}
                        </div>
                      </>
                    )}
                    <div className="input-group">
                      <button type="submit" className="update-button">
                        Update
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <p>Detail information here...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

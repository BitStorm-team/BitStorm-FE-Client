import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../assets/css/profile/action.css";
import { API_URL, headerAPI } from "../../utils/helpers";
import { Button, message } from "antd";
import "../../assets/css/profile/loadingProfille.css";
import PostItem from "./PostItem";
import { BellOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function Action(props) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [fileCertList, setFileCertList] = useState([]);
  const [imageCertUrl, setCertImageUrl] = useState("");
  const [header] = useState(headerAPI);
  const fileInputRef = useRef(null); // Ref để truy cập input file
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCert, setIsLoadingCert] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { postInfor } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (props.infor) {
      setFormData({
        ...props.infor,
        expert: props.infor.expert || {}, // Ensure 'expert' is initialized
      });
    }
  }, [props.infor]);
  useEffect(() => {
    // Giả lập quá trình tải dữ liệu bài viết
    const fetchPosts = async () => {
      setIsPostLoading(true);
      try {
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsPostLoading(false);
      } catch (error) {
        console.error("Error loading posts:", error);
        setIsPostLoading(false);
      }
    };

    fetchPosts();
  }, []);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const API =
      formData.role_id === 2
        ? `${API_URL}/user/profile`
        : formData.role_id === 3
        ? `${API_URL}/experts/profile`
        : null;
    if (API) {
      try {
        if (formData.role_id === 3) {
          const updateResponse = await axios.patch(
            API,
            {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              experience: formData.expert.experience,
              certificate: imageCertUrl,
              profile_picture: imageUrl,
            },
            { headers: header }
          );
          message.success(
            updateResponse.data.message || "Updated successfully"
          );
          setShowDetailModal(false);
          
        } else {
          const updateResponse = await axios.patch(
            API,
            {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              profile_picture: imageUrl,
            },
            { headers: header }
          );
          message.success(
            updateResponse.data.message || "Updated successfully"
          );
          setShowDetailModal(false);
          setIsUpdating(true);
        }
      } catch (error) {
        message.error(
          "Update failed " + (error.response?.data?.message || error.message)
        );
      } finally{
        setIsUpdating(false);
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
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
      }
    }
  };

  const handleCertificateChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoadingCert(true);
      try {
        const secureUrl = await getUrlUpdateUserImg(file);
        console.log("File URL from Cloudinary:", secureUrl);
        setCertImageUrl(secureUrl); // Lưu URL vào state imageCertUrl
        setFormData((prevState) => ({
          ...prevState,
          expert: {
            ...prevState.expert,
            certificate: secureUrl,
          },
        }));
        setFileCertList((prevList) => [...prevList, file]);
      } catch (error) {
        console.error("Error updating user image:", error);
      } finally {
        setIsLoadingCert(false); // Kết thúc trạng thái loading
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
                <div>
                  <h2>Personal Information</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="avatar-container">
                      {isLoading ? (
                        <span class="loader"></span>
                      ) : (
                        <>
                          <div className="avatar_profile_update">
                            <img
                              src={imageUrl || props.infor.profile_picture}
                              alt="Profile"
                              className="profile-picture"
                            />
                          </div>
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
                      name="profile_picture"
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
                          {isLoadingCert ? (
                            <div className="loader-container1">
                              <div className="loader1"></div>
                            </div>
                          ) : (
                            <>
                              <div className="file-input-container">
                                <div className="file-input-wrapper">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCertificateChange}
                                    className="file-input"
                                  />
                                  <div className="custom-button">
                                    Choose File
                                  </div>
                                </div>
                                <img
                                  src={
                                    imageCertUrl || formData.expert?.certificate
                                  }
                                  alt="Certificate"
                                  className="certificate-img"
                                />
                              </div>

                              <input
                                type="hidden"
                                name="certificate"
                                id="certificate"
                                value={imageCertUrl}
                              />
                            </>
                          )}
                        </div>
                      </>
                    )}
                    <div className="input-group">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="update-button"
                        loading={isUpdating} // 4. Use loading state to display loading indicator
                      >
                        Update
                      </Button>
                    </div>
                  </form>
                </div>
              ) : isPostLoading ? (
                <p>Loading posts...</p>
              ) : postInfor && postInfor.length > 0 ? (
                <div>
                  <h2>Your post recently</h2>
                  {postInfor
                    .slice()
                    .reverse()
                    .map((post, index) => (
                      <PostItem key={index} post={post} />
                    ))}
                </div>
              ) : (
                <p>You currently have no posts</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

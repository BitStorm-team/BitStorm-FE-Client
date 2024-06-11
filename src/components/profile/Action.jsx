import React, { useState, useEffect } from "react";
import "../../assets/css/profile/action.css";

export default function Action(props) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (props.infor) {
      setFormData(props.infor);
    }
  }, [props.infor]);

  const openDetailModal = () => {
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as making an API call
    console.log('Form data submitted:', formData);
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
                <div data-aos="zoom-in">
                  <h2>Personal Information</h2>
                  <form onSubmit={handleSubmit}>
                    <img
                      src={formData.profile_picture}
                      alt="Profile"
                      className="profile-picture"
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
                            value={formData.experience || ""}
                            onChange={handleExpertChange}
                          />
                        </div>
                        <div className="input-group">
                          <label>
                            <strong>Certificate</strong>
                          </label>
                          <input
                            type="text"
                            name="certificate"
                            value={formData.certificate || ""}
                            onChange={handleExpertChange}
                          />
                        </div>
                      </>
                    )}
                    <div className="input-group">
                      <button type="submit" className="update-button">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
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

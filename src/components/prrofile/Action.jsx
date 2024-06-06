import React, { useState } from "react";
import "../../assets/css/profile/action.css";

export default function Action(props) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const openDetailModal = () => {
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
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
                  <form>
                    <img
                      src={props.infor.profile_picture}
                      alt="Profile"
                      className="profile-picture"
                    />
                    <div className="input-group">
                      <label>
                        <strong>Name</strong>
                      </label>
                      <input type="text" value={props.infor.name} readOnly />
                    </div>
                    <div className="input-group">
                      <label>
                        <strong>Email</strong>
                      </label>
                      <input type="email" value={props.infor.email} readOnly />
                    </div>
                    <div className="input-group">
                      <label>
                        <strong>Experience</strong>
                      </label>
                      <input
                        type="text"
                        value={props.infor.expert?.experience || "..."}
                        readOnly
                      />
                    </div>
                    <div className="input-group">
                      <label>
                        <strong>Certificate</strong>
                      </label>
                      <input
                        type="text"
                        value={props.infor.expert?.certificate || "..."}
                        readOnly
                      />
                    </div>
                    <div className="input-group">
                      <label>
                        <strong>Address</strong>
                      </label>
                      <input type="text" value={props.infor.expert?.address || "..."} readOnly />
                    </div>
                    <div className="input-group">
                      <label>
                        <strong>Upload:</strong>
                      </label>
                      <input type="text" value="Problem" readOnly />
                    </div>
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

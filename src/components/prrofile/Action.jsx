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
      <div className="card_profile" style={{ width: "18rem" }} onClick={openDetailModal}>
        <div className="card-body">
          <p className="card-icon">{props.icon}</p>
          <p className="card-title">{props.title}</p>
          <p className="card-text">{props.description}</p>
        </div>
      </div>

      {showDetailModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeDetailModal}>
                &times;
              </span>
              <p>Detail information here...</p>
              {/* Add detailed information here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

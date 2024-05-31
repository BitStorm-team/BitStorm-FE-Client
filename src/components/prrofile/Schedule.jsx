import React, { useState } from "react";
import { FaEllipsisV, FaEye, FaTrash } from "react-icons/fa";
import "../../assets/css/profile/schedule.css";

export default function Schedule(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const openDetailModal = () => {
    setShowDetailModal(true);
    setShowMenu(false);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const deleteSchedule = () => {
    // Implement delete functionality here
    console.log("Delete schedule");
    setShowMenu(false);
  };

  return (
    <>
      <div className="card_profile_schedule">
        <div className="card-body">
          <p className="card-title">{props.time}</p>
        </div>
        <div className="menu-container">
            <button className="menu-button" onClick={toggleMenu}>
              <FaEllipsisV />
            </button>
            {showMenu && (
              <div className="menu_schedule">
                <button className="detail_shedule" onClick={openDetailModal}>
                  <FaEye />
                </button>
                <button className="delete_shedule" onClick={deleteSchedule}>
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
      </div>

      {showDetailModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeDetailModal}>
              &times;
            </span>
            <p>Detail information here...</p>
          </div>
        </div>
      )}
    </>
  );
}

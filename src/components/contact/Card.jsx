// Card.js
import React from "react";
import "../../assets/css/contact/card.css"; // Đảm bảo rằng bạn có file CSS để style cho component
import { useNavigate } from "react-router-dom";

const Card = ({ name, email, image, id }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/expert/${id}`);
  };
  return (
    <div className="cardd">
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-content" >
        <h3 className="card-title">{name}</h3>
        <p className="card-name">{email}</p>
      </div>
      <div className="btn_card_box">
        <button className="btn_card" onClick={handleDetail}>See Detail</button>
      </div>
    </div>
  );
};

export default Card;

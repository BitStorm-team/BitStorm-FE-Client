// Card.js
import React from "react";
import "../../assets/css/contact/card.css"; // Đảm bảo rằng bạn có file CSS để style cho component

const Card = ({ name, email, image }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-content" >
        <h3 className="card-title">{name}</h3>
        <p className="card-name">{email}</p>
      </div>
      <div className="btn_card_box">
        <button className="btn_card">See Detail</button>
      </div>
    </div>
  );
};

export default Card;

// Card.js
import React from "react";
import "../../assets/css/contact/card.css"; // Đảm bảo rằng bạn có file CSS để style cho component
import { useNavigate } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";

const Card = ({ name, email, image, id }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/expert-detail/${id}`);
  };
  return (
    <div className="cardd">
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-content" >
        <h3 className="card-title" style={{marginTop:"20px"}}>{name}</h3>
        <p className="card-name">{email}</p>
      </div>
      <div className="btn_card_box">
        <button className="btn_card" onClick={handleDetail}>See Detail<CaretRightOutlined style={{color:"pink"}}/></button>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardExpert({ name, experience, id, img }) {
  const navigate = useNavigate();
  const handleExpertDetail = () => {
    navigate(`/expert/${id}`);
  };
  return (
    <div className="card">
      <img className="card-image" src={img} alt={img} />
      <h2>{name}</h2>
      <p>{experience}</p>
      <div className="card-button">
        <button class="custom-btn btn-16" onClick={handleExpertDetail}>
          View More
        </button>
      </div>
    </div>
  );
}

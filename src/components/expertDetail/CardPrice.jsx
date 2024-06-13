import { useNavigate } from "react-router-dom";
import React from "react";
const CardPrice = ({ name, email, image, id}) => {
    const navigate = useNavigate();
    const handleDetail = () => {
        navigate(`/expert/${id}`);
      };
    return (
        <div className="cardprice">
            <img src={image} alt={name} className="card-image"/>
            <h2 className="h2" >{name}</h2>
            <p>{email}</p>
            <button className="custom-btn btn-16" onClick={handleDetail}>Read More</button>
        </div>
    )

}
export default CardPrice;
import React from "react";
import ErrorImage from "../../assets/images/error.png"
const Error = () => {
    
    return (
        <div className="error">
            <img src={ErrorImage} alt="" />
            <h2>I'm sorry ! Doctor Name Does Not Match In BitStorm</h2>
        </div>
    )
}
export default Error;
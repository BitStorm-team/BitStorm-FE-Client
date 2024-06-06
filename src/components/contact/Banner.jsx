import React from "react";
import "../../assets/css/contact/banner.css";
export default function Banner(props) {
  return (
    <div className="banner">
      <div className="banner-item">
        <h1 className="title-banner">{props.title}</h1>
        <p className="text-banner">
          {props.description}
        </p>
      </div>
    </div>
  );
}

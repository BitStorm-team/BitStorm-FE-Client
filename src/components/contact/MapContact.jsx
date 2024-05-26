import React from "react";
import "../../assets/css/contact/MapContact.css";

const MapContact = () => {
  //Vỹ độ
  const latitude = 16.05913460829639;
  //Kinh độ
  const longitude = 108.2412752378355;

  return (
    <div className="map-contact" style={{display:"flex",justifyContent:"center",}}>
      <div className="map-container">
        <iframe
          title="Google Map"
          src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15508.185586991273!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b8f72f44b7%3A0x0!2zMTbCsDAzJzM1LjciTiAxMDjCsDE0JzI0LjYiRQ!5e0!3m2!1sen!2s!4v1620031927737!5m2!1sen!2s`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="contact-info" style={{marginTop:"5%"}}>
        <h2>We are here for you</h2>
        <p>
          <strong>Address: </strong>108 - Le Huu Trac - Son Tra - Da Nang
        </p>
        <p>
          <strong>Phone number: </strong>+1 643 726 323 720
        </p>
        <p>
          <strong>Time work: </strong>Monday - Sunday 7am - 2pm
        </p>
        <p>
          <strong>Email: </strong>511763@gmail.com
        </p>
        <p>
          <strong>Other social networks: </strong>
          <a href="http://www.facebook.com">www.facebook.com</a>
          <br />
          <a href="http://www.instagram.com">www.instagram.com</a>
        </p>
      </div>
    </div>
  );
};

export default MapContact;

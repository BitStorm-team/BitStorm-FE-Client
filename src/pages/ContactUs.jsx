import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import "../assets/css/contact/contactUs.css";
import Banner from "../components/contact/Banner.jsx";
import ImageContact from "../assets/images/long-haired-girl-watching-through-binoculars (2) 1.svg";
import LineIcon from "../assets/images/Group 1000006713iconOfContact.png";
import Card from "../components/contact/Card.jsx";
// import DoctorImage from "../assets/images/Doctor.jpg";
// import DoctorImage2 from "../assets/images/Telephone-Counselling-768x512.jpg";
import MapContact from "../components/contact/MapContact.jsx";
import Slider from "react-slick";
import axios from "axios";
import { headerAPI } from "../utils/helpers.js";
import DrImage from "../assets/images/Doctor.jpg";

const ContactUs = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Here you can add your logic to handle form submission
  };
  //  states
  const [expertData, setExpertData] = useState([{}]);
  // effects
  useEffect(() => {
    fetchExpertData();
  }, []);

  const fetchExpertData = async () => {
    const header = headerAPI();
    const API = "http://127.0.0.1:8000/api/experts";
    try {
      const response = await axios.get(API, { headers: header });
      if (response) {
        setExpertData(response.data.data[0].slice(0, 5));
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="contact-us">
      <Banner />
      <MapContact />
      <div
        className="contact-form"
        style={{
          maxHeight: "500px",
          position: "relative",
          borderRadius: "20px",
          backgroundColor: "rgba(155, 81, 219, 0.1)",
        }}
      >
        <div style={{ marginTop: "-150px", position: "relative", zIndex: "0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40%",
              position: "relative",
              zIndex: "1",
              marginTop: "-90px",
              marginLeft: "-10%",
            }}
          >
            <img
              className="FirstImage"
              src={LineIcon}
              alt="LineIcon"
              style={{ width: "300px", position: "relative", zIndex: "2" }}
            />
            <img
              className="ThirdImage"
              src={LineIcon}
              alt="LineIcon"
              style={{
                width: "200px",
                maxHeight: "230px",
                position: "relative",
                zIndex: "2",
              }}
            />
          </div>
          <div
            className="form_icon_contact"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: "2",
              gap: "10%",
            }}
          >
            <div style={{ zIndex: "3", marginTop: "-5%" }}>
              <div
                style={{
                  maxWidth: "100%",
                  color: "#76AFF2",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3>Do you have any questions?</h3>
                <p>
                  If you have any questions or wish to express your feelings, or{" "}
                  <br />
                  anything you would like to share with us, please feel free to{" "}
                  <br />
                  contact us. <br />
                  BitStorm will respond as soon as possible.
                </p>
              </div>
              <div
                className="circular-image"
                style={{ marginLeft: "70%", marginTop: "-10%" }}
              >
                <img
                  src={ImageContact}
                  alt="Contact-us"
                  style={{ backgroundColor: "white", width: "200px" }}
                />
              </div>
            </div>
            <Form
              name="contact"
              onFinish={onFinish}
              style={{ width: "50%", zIndex: "2" }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Please enter your message",
                  },
                ]}
              >
                <Input.TextArea
                  style={{ height: "160px" }}
                  placeholder="Message"
                />
              </Form.Item>

              <Form.Item
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  style={{ display: "flex", alignItems: "center" }}
                  type="primary"
                  htmlType="submit"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40%",
              position: "relative",
              zIndex: "1",
              marginTop: "-110px",
              marginLeft: "-10%",
            }}
          >
            <img
              src={LineIcon}
              alt="LineIcon"
              style={{ width: "130px", maxHeight: "130px" }}
            />
            <img src={LineIcon} alt="LineIcon" style={{ width: "300px" }} />
          </div>
        </div>
      </div>
      <div className="doctor_contact">
        <h1 style={{marginTop:"10px"}}>Some experts in the field of psychology</h1>
        <div className="card-container">
          <Slider {...settings}>
            {expertData.map((doctor, index) => (
              <Card
                key={index}
                name={doctor.name}
                email={doctor.email}
                image={
                  doctor.profile_picture
                    ? doctor.profile_picture
                    : DrImage
                }
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import React from "react";
import { Form, Input, Button } from "antd";
import "../assets/css/contact/contactUs.css";
import Banner from "../components/contact/Banner.jsx";
import MapContact from "../components/contact/MapContact.jsx";
import ImageContact from "../assets/images/long-haired-girl-watching-through-binoculars (2) 1.svg";
import LineIcon from "../assets/images/Group 1000006713iconOfContact.png";

const ContactUs = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Here you can add your logic to handle form submission
  };

  return (
    <div className="contact-us">
      <Banner />
      <MapContact />
      <div className="contact-form">
        <img className="FirstImage" src={LineIcon} alt="LineIcon" />
        <div className="form_icon_contact">
          <div class="circular-image">
            <img
              src={ImageContact}
              alt="Contact-us"
              style={{ backgroundColor: "lightblue" }}
            />
            <img src={LineIcon} alt="LineIcon" />
          </div>
          <Form name="contact" onFinish={onFinish}>
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
              <Input.TextArea placeholder="Message" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

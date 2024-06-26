import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import "../assets/css/contact/contactUs.css";
import Banner from "../components/contact/Banner.jsx";
import ImageContact from "../assets/images/long-haired-girl-watching-through-binoculars (2) 1.svg";
import Card from "../components/contact/Card.jsx";
import MapContact from "../components/contact/MapContact.jsx";
import Slider from "react-slick";
import axios from "axios";
import { API_URL, headerAPI } from "../utils/helpers.js";
import DrImage from "../assets/images/Doctor.jpg";
import Loading from "../components/expertDetail/Loading.jsx";

const ContactUs = () => {
  // states
  const [expertData, setExpertData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form] = Form.useForm();

  // effects
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000); // Simulate 2 seconds loading time
  }, []);

  useEffect(() => {
    fetchExpertData();
  }, []);

  const fetchExpertData = async () => {
    const header = headerAPI();
    const API = `${API_URL}/experts`;
    try {
      const response = await axios.get(API, { headers: header });
      if (response) {
        setExpertData(response.data.data[0].slice(0, 5));
      }
    } catch (error) {
      setError("Error fetching doctors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSubmitContactForm = async (values) => {
    setButtonLoading(true); // Start loading
    const header = headerAPI();
    const API = `${API_URL}/contactUs`;
    try {
      const response = await axios.post(
        API,
        {
          email: values.email,
          message: values.message,
        },
        {
          headers: header,
        }
      );
      console.log("Response:", response);

      form.resetFields(); // Reset form fields
      message.success(response.data.message || "Send message successfully");
    } catch (error) {
      console.error("Contact failed", error);
      message.error(
        "Contact failed " + (error.response?.data?.message || error.message)
      );
    } finally {
      setButtonLoading(false); // Stop loading
    }
  };

  return (
    <div className="contact-us">
      {pageLoading ? (
        <Loading />
      ) : (
        <>
          <Banner title = "Contact Us" description="Come to BitStorm if you have personal issues that you want to resolve. Contact us now to discuss the problems you are facing."/>
          <MapContact />
          <div
            className="contact-form"
            style={{
              maxHeight: "500px",
              position: "relative",
              borderRadius: "20px",
              backgroundColor: "#ECEFFF",
              maxWidth: "95%",
            }}
          >
            <div style={{ position: "relative", zIndex: "0" }}>
              <div className="form_icon_contact">
                <div style={{ zIndex: "3" }}>
                  <div
                    className="text-contact"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h3 style={{ fontSize: "35px" }}>
                      Let's Get in <span style={{ color: "#676ECA" }}>Touch!</span>
                    </h3>
                    <p>
                      If you have any questions or wish to express your feelings, or
                      <br />
                      anything you would like to share with us, please feel free to
                      <br />
                      contact us. <br />
                      <strong>
                        <span style={{ color: "#676ECA" }}>
                          BitStorm will respond as soon as possible.
                        </span>
                      </strong>
                    </p>
                  </div>
                  <div className="circular-image" style={{ marginLeft: "70%" }}>
                    <img
                      src={ImageContact}
                      alt="Contact-us"
                      style={{ backgroundColor: "white", width: "200px" }}
                    />
                  </div>
                </div>
                <Form
                  form={form} // Associate form instance
                  name="contact"
                  onFinish={handleSubmitContactForm}
                  style={{ width: "40%", zIndex: "2" }}
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
                    label="Email"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter your email address here"
                      style={{
                        backgroundColor: "#ECEFFF",
                        border: "1px solid #676ECA",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your message",
                      },
                    ]}
                    label="Message"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input.TextArea
                      placeholder="Enter your message here"
                      style={{
                        height: "160px",
                        backgroundColor: "#ECEFFF",
                        border: "1px solid #676ECA",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#676ECA",
                      }}
                      type="primary"
                      htmlType="submit"
                      loading={buttonLoading} // Add loading state to button
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="doctor_contact">
            <h1 style={{ marginTop: "20px", marginBottom:"20px" }}>
              Some experts in the field of psychology
            </h1>
            {loading ? (
              <Loading />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="card-containerr">
                <Slider {...settings}>
                  {expertData.map((doctor, index) => (
                    <Card
                      key={index}
                      name={doctor.name}
                      email={doctor.email}
                      image={
                        doctor.profile_picture ? doctor.profile_picture : DrImage
                      }
                      id={doctor.id}
                    />
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ContactUs;

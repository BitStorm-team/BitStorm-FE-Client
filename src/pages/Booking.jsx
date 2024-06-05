import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import axios from "axios";
import "../assets/css/booking/booking.css";
import { API_URL } from "../utils/helpers";
import { getExpertProfile, getUserProfile } from "../api";
import Loading from "../components/expertDetail/Loading";
import { useParams } from "react-router-dom";
const { TextArea } = Input;
const { Text } = Typography;

const Booking = () => {
  // state
  const { expert_id, calendar_id, start_time, end_time, price } = useParams(); // Lấy id từ URL

  const [user, setUser] = useState(null);
  const [expert, setExpert] = useState({});
  const [expertInfo, setExpertInfo] = useState({});
  const [isExpert, setIsExpert] = useState(false);

  const token = localStorage.getItem("__token__");

  const getUser = async () => {
    try {
      const userProfileData = await getUserProfile();
      setUser(userProfileData);
      if (userProfileData.role_id === 3) {
        setIsExpert(true);
      }
    } catch (error) {
      console.error("Error getting user profile:", error);
    }
  };

  const getExpert = async () => {
    try {
      const response = await axios.get(API_URL + `/experts/${expert_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setExpert(response.data.data);
        setExpertInfo(response.data.data.expertDetail.user);
        console.log(response.data.data.expertDetail.user);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getExpert();
    getUser();
  }, []);


  const handleErrorIsExpert = () => {
    alert('You are not allowed to book')
  }

  const handleSubmit = async (values) => {
    const { notes } = values;
    console.log(notes);

    const dataBooking = {
      user_id: user.id, // Adjust the userId as needed
      calendar_id: calendar_id, // Adjust the calendarId as needed
      note: notes, // Assuming notes are used for booking
      status: "New",
    };

    localStorage.setItem("dataBooking", JSON.stringify(dataBooking));

    try {
      const paymentResponse = await axios.post(`${API_URL}/payment`, {
        total: price * 100,
      }); // Adjust the amount here
      const { data } = paymentResponse;

      if (data.code === "00") {

        // If payment URL is received successfully, redirect to the payment page
        window.location.href = data.data;
      } else {
        // Handle error if needed
        console.error("Failed to get payment URL");
      }
    } catch (error) {
      // Handle error if needed
      console.error("An error occurred:", error);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Card className="appointment-details" title="Appointment with Expert">
        <div className="info">
          <Text>
            <strong>Expert's Full Name:</strong> {expertInfo.name}
          </Text>
          <br />
          <Text>
            <strong>Appointment Time with Expert:</strong> {start_time} -{" "}
            {end_time}
          </Text>
          <br />
          <Text
            style={{ fontWeight: "bold", fontSize: "1.2em", color: "#d9534f" }}
          >
            <strong>Total Amount:</strong> {price},000 VND
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "400px",
            backgroundColor: "gray",
            overflow: "hidden",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={expertInfo.profile_picture}
            alt=""
            className="qr-code"
          />
        </div>
      </Card>
      <Card className="form-section" title="Your Information">
        <Form
          layout="vertical"
          onFinish={isExpert ? handleErrorIsExpert : handleSubmit}
          initialValues={{ name: user.name, email: user.email }}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                message: "Please enter your email address",
                type: "email",
              },
            ]}
          >
            <Input type="email" placeholder="Email Address" />
          </Form.Item>
          <Form.Item name="notes" label="Notes for the Expert (if any)">
            <TextArea placeholder="Notes for the Expert (if any)" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{
                float: "right",
                width: "100%",
              }}
              htmlType="submit"
            >
              Book Appointment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Booking;

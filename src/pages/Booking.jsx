import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import axios from "axios";
import "../assets/css/booking/booking.css";
import { API_URL, headerAPI } from "../utils/helpers";
import expertVaatar from "../assets/images/expertDetail/doctor.jpg";
import { getExpertProfile, getUserProfile } from "../api";
import Loading from "../components/expertDetail/Loading";
import { useParams } from "react-router-dom";

const { TextArea } = Input;
const { Title, Text } = Typography;

const Booking = () => {
  // state
  const { expert_id, calendar_id, start_time, end_time ,price } = useParams(); // Lấy id từ URL

  const [user, setUser] = useState(null);
  const [expert, setExpert] = useState({});
  const [expertInfo, setExpertInfo] = useState({});

  const token = localStorage.getItem("__token__");

  const getUser = async () => {
    try {
      const userProfileData = await getUserProfile();
      setUser(userProfileData);
      if (userProfileData.role_id === 3) {
        getExpertProfile();
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
        // console.log(response.data.data);
        setExpertInfo(response.data.data.expertDetail.user);
        console.log(response.data.data.expertDetail.user)
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getExpert();
    getUser();
  }, []);

  const handleSubmit = async (values) => {
    const { notes } = values;
    console.log(notes);

    try {
      // Call the booking API first
      const bookingResponse = await axios.post(
        `${API_URL}/user/book-calendar/${calendar_id}`,
        {
          user_id: user.id, // Adjust the userId as needed
          calendar_id: calendar_id, // Adjust the calendarId as needed
          note: notes, // Assuming notes are used for booking
          status: "New",
        }, // Assuming the initial status is 'pending'
        {
          headers: headerAPI(), // Include headers
        }
      );

      // If booking is successful, proceed to VNPAY API
      if (bookingResponse.status === 200 || bookingResponse.status === 201) {
        const paymentResponse = await axios.post(`${API_URL}/payment`, {
          total: price*100,
        }); // Adjust the amount here
        const { data } = paymentResponse;
        if (data.code === "00") {
          // If payment URL is received successfully, redirect to the payment page
          window.location.href = data.data;
        } else {
          // Handle error if needed
          console.error("Failed to get payment URL");
        }
      } else {
        // Handle booking error if needed
        console.error("Failed to book calendar");
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
      <Card className="appointment-details" title="Lịch hẹn với chuyên gia">
        <div className="info">
          <Text>
            <strong>Họ và tên chuyên gia:</strong> {expertInfo.name}
          </Text>
          <br />
          <Text>
            <strong>Thời gian gặp với chuyên gia:</strong> {start_time} - {end_time}
          </Text>
          <br />
          <Text
            style={{ fontWeight: "bold", fontSize: "1.2em", color: "#d9534f" }}
          >
            <strong>Tổng tiền:</strong> {price},000 VND
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
      <Card className="form-section" title="Thông tin của bạn">
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ name: user.name, email: user.email }}
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên của bạn" },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Địa chỉ email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ email của bạn",
                type: "email",
              },
            ]}
          >
            <Input type="email" placeholder="Địa chỉ email" />
          </Form.Item>
          <Form.Item name="notes" label="Ghi chú dành cho chuyên gia (nếu có)">
            <TextArea
              placeholder="Ghi chú dành cho chuyên gia (nếu có)"
              rows={4}
            />
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
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Booking;

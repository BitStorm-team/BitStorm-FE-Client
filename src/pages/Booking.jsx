import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import axios from "axios";
import "../assets/css/booking/booking.css";
import { API_URL, headerAPI } from "../utils/helpers";

const { TextArea } = Input;
const { Title, Text } = Typography;

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    try {
      // Call the booking API first
      const bookingResponse = await axios.post(
        `${API_URL}/user/book-calendar/2`,
        {
          user_id: 1, // Adjust the userId as needed
          calendar_id: 1, // Adjust the calendarId as needed
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
          total: 1000,
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

  return (
    <div className="container">
      <Card className="form-section" title="Thông tin của bạn">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Họ và tên">
            <Input
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ email">
            <Input
              type="email"
              placeholder="Địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Ghi chú dành cho chuyên gia (nếu có)">
            <TextArea
              placeholder="Ghi chú dành cho chuyên gia (nếu có)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card className="appointment-details" title="Lịch hẹn với chuyên gia">
        <div className="info">
          <Text>
            <strong>Họ và tên chuyên gia:</strong> Phạm Gia Bảo
          </Text>
          <br />
          <Text>
            <strong>Thời gian gặp với chuyên gia:</strong> 11h-12h, 03/01/2024
          </Text>
          <br />
          <Text>
            <strong>Tổng tiền:</strong> 10,000 VND
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 className="special-text">
            Scan mã QR code dưới đây để thanh toán
          </h1>
          <img
            src="https://c1.img2qr.com/images/simple_qrcode.png?x-oss-process=image/quality,Q_80"
            alt="QR Code"
            className="qr-code"
          />
        </div>
      </Card>
    </div>
  );
};

export default Booking;

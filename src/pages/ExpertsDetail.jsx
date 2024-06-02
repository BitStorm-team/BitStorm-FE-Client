import "../assets/css/expertDetail.css";
import Doctor from "../assets/images/expertDetail/doctor.jpg";
import Stars from "../assets/images/expertDetail/stars.png"
import ExpertDetailReview from "../components/expertDetail/ExpertDetailReview";
import CardExpert from "../components/expertDetail/CardExpert";
import ScheduleButton from "../components/expertDetail/ScheduleButton";
import { API_URL, fetchAPIUserExpert, headerAPI } from "../utils/helpers";
import Loading from "../components/expertDetail/Loading";
import axios from "axios";
//import { HeartOutlined } from "../../node_modules/@ant-design/icons-svg/es/index.d.ts";
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { Content } = Layout;

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="#fadb14"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 17.27l-6.18 3.73 1.59-7.02L2.56 9.98l7.08-.61L12 2l2.36 7.37 7.08.61-5.85 4.01 1.59 7.02z" />
  </svg>
);
export default function ExpertDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [expert, setExpert] = useState({});
  const [listExpert, setListExpert] = useState([]);
  const [randomExperts, setRandomExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  //get detailed information about the selected expert
  useEffect(() => {
    const token = localStorage.getItem("__token__");
    const fetchExpert = async () => {
      try {
        const response = await axios.get(API_URL + `/experts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setExpert(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchExpert();
  }, [id]);

  //get list suggest expert
  useEffect(() => {
    const token = localStorage.getItem("__token__");
    const fetchListExpert = async () => {
      try {
        const response = await axios.get(API_URL + `/experts/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setListExpert(response.data.data);
          
          setRandomExperts(
            response.data.data[0]
              .filter((exp) => exp.id !== expert.id)
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchListExpert();
  }, []);
console.log(randomExperts);
  
  if (loading) {
    return <Loading />;
  }
  if (!expert || !expert.expertDetail) {
    return <div>Error: Data not found</div>;
  }
  const { expertDetail, schedules } = expert;
  const { average_rating, certificate, experience, user } = expertDetail;
  const { name, email, profile_picture } = user;
  const rating = parseInt(average_rating, 10);
  // console.log(expert);
  return (
    <Layout className="fluid-container" style={{ marginBottom: 50 }}>
      <div>
        <Content>
          <Row id="cardExpert" className="expert_detail">
            <Col xs={24} md={8} className="doctor_image">
              <img
                src={
                  profile_picture
                    ? profile_picture // Sử dụng profile_picture nếu tồn tại
                    : "https://img.freepik.com/free-vector/isolated-young-handsome-man-set-different-poses-white-background-illustration_632498-649.jpg?w=740&t=st=1716713290~exp=1716713890~hmac=3528b47af850651d9c3bafab98d8a0bc83f46cc56d8c17cf4d626aff86848b7d"
                  // Sử dụng hình ảnh mặc định nếu profile_picture không tồn tại
                }
                alt="Doctor"
              />
            </Col>
            <Col sm={14} xs={24} md={15} className="container_content">
              <h2 className="doctor_job_title">
                Psychologist - <span className="doctor_name">{name}</span>{" "}
              </h2>

              <div className="flexStyle">
                <div style={{ paddingRight: 15 }}>
                  <p className="review-rating" style={{ marginRight: 10 }}>
                    {average_rating}
                  </p>
                </div>
                {Array.from({ length: rating }, (v, i) => (
                  <StarIcon key={i} />
                ))}
                <p className="review-rating">100 reviews</p>
              </div>

              <h2 style={{ marginTop: 20 }}>Experience</h2>
              <p>
                {" "}
                <Typography.Paragraph>{experience}.</Typography.Paragraph>
              </p>
              <div
                className="flexStyle"
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                <h3 style={{ marginRight: 10 }}>Email</h3>
                <h3 style={{ color: " #007bff" }}>{email}</h3>
              </div>
              <h2>All schedules</h2>
              <div>
                <div>
                  {schedules.map((schedule, index) => {
                    return (
                      <ScheduleButton
                        key={index}
                        start_time={schedule.start_time}
                        end_time={schedule.end_time}
                        calendar_id={schedules.id}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="favorite_container">
                <h2
                  style={{ marginRight: 50, marginTop: 20 }}
                  className="favorite"
                >
                  Add this expert to your favorites list
                </h2>
                <div className="favoriteIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    fill="red"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <p style={{ paddingLeft: 5, fontWeight: "bold" }}>20 tyms</p>
                </div>
              </div>
            </Col>
            <Row></Row>
          </Row>
        </Content>
        <div style={{ marginTop: 50 }}></div>
        <div className="containerRelatedExperts">
          <h1 className="titleRelatedExpert">Related experts</h1>
          <div className="wrapper">
            {randomExperts.map((expert, index) => {
              return <CardExpert key={index} name={expert.name} experience={expert.experience} id={expert.id} />;
            })}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 50 }}></div>
      <div className="expert_detail_reviews">
        <div>
          <h2 className="user_review_container"> Reviews from users</h2>
          <div className="container_filter_rating">
            <p style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>
              4/5
            </p>
            <img src={Stars} alt="Stars" style={{ marginRight: 10 }} />
            <Button className="filterRatingBtn">See all</Button>
            <Button className="filterRatingBtn1">
              <span style={{ marginRight: 5 }}> 5 stars</span>
              <StarIcon></StarIcon> <StarIcon></StarIcon> <StarIcon></StarIcon>{" "}
              <StarIcon></StarIcon> <StarIcon></StarIcon>
            </Button>
            <Button className="filterRatingBtn1">
              <span style={{ marginRight: 5 }}> 4 stars</span>
              <StarIcon></StarIcon> <StarIcon></StarIcon> <StarIcon></StarIcon>{" "}
              <StarIcon></StarIcon>
            </Button>
            <Button className="filterRatingBtn1">
              <span style={{ marginRight: 5 }}> 3 stars</span>{" "}
              <StarIcon></StarIcon> <StarIcon></StarIcon> <StarIcon></StarIcon>
            </Button>
            <Button className="filterRatingBtn1">
              <span style={{ marginRight: 5 }}> 2 stars</span>{" "}
              <StarIcon></StarIcon> <StarIcon></StarIcon>
            </Button>
            <Button className="filterRatingBtn1">
              <span style={{ marginRight: 5 }}> 1 star</span>
              <StarIcon></StarIcon>
            </Button>
          </div>
        </div>
        <div>
          {<ExpertDetailReview></ExpertDetailReview>}
          {<ExpertDetailReview></ExpertDetailReview>}
        </div>
      </div>
    </Layout>
  );
}

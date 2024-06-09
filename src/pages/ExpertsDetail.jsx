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
import { Navigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
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
  const [isFilter, setIsFilter] = useState(false);
  const [filterRating, setFilterRating] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);


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
  console.log("expert detail: ",expert);
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
              .filter((exp) => exp.id !== id)
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
  }, [id]);

   useEffect(() => {
     if (expert.feedback) {
       setFeedbacks(expert.feedback.slice(0, 2));
     }
   }, [expert]);

  
// console.log("expert id: ",id)
// console.log("list expert: ",listExpert);
// console.log("list random expert: ",randomExperts);


   useEffect(() => {
     if (expert.feedback) {
       setFeedbacks(expert.feedback.slice(0, 2));
     }
   }, [expert]);


  if (loading) {
    return <Loading />;
  }
  if (!expert || !expert.expertDetail) {
    return (<NotFound></NotFound>);
  }
  const { expertDetail, schedules, feedback } = expert;
  const { average_rating, certificate, experience, user } = expertDetail;
  const { name, email, profile_picture } = user;
  const rating = parseInt(average_rating, 10);

   const handleFilterClick = (rating) => {
     setIsFilter(true);
     setFilterRating(rating);
     const filteredFeedbacks = expert.feedback.filter(
       (feedback) => feedback.rating === rating
     );
     setFeedbacks(filteredFeedbacks);
   };

   const handleShowAllClick = (e) => {
     setIsFilter(false);
     setFilterRating(null);
     setFeedbacks(feedback);
   };

   console.log("feedback", feedbacks.slice(0, 2));

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
                <p className="review-rating">{feedback.length} reviews</p>
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
              {schedules.length === 0 ? (
                <div>No schedule avalable</div>
              ) : (
                <div>
                  <div className="schedule_container">
                    {schedules.map((schedule, index) => {
                      return (
                        <ScheduleButton
                          status = {schedule.status}
                          key={index}
                          start_time={schedule.start_time}
                          end_time={schedule.end_time}
                          calendar_id={schedule.id}
                          expert_id={id}
                          price={schedule.price}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

            </Col>
            <Row></Row>
          </Row>
        </Content>
        <div style={{ marginTop: 50 }}></div>
        <div className="containerRelatedExperts">
          <h1 className="titleRelatedExpert">Related experts</h1>
          <div className="wrapper">
            {randomExperts.map((expert, index) => {
              return (
                <CardExpert
                  key={index}
                  name={expert.name}
                  experience={expert.experience}
                  id={expert.id}
                  img={expert.profile_picture}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 50 }}></div>
      <div className="expert_detail_reviews">
        <div>
          <h2 className="user_review_container"> Reviews from users</h2>
          {feedback.length > 0 ? (
            <div className="container_filter_rating">
              <Button className="filterRatingBtn" onClick={handleShowAllClick}>
                See all
              </Button>
              <Button className="filterRatingBtn1">
                <span
                  style={{ marginRight: 5 }}
                  onClick={() => handleFilterClick(5)}
                >
                  {" "}
                  5 stars
                </span>
                <StarIcon></StarIcon> <StarIcon></StarIcon>{" "}
                <StarIcon></StarIcon> <StarIcon></StarIcon>{" "}
                <StarIcon></StarIcon>
              </Button>
              <Button className="filterRatingBtn1">
                <span
                  style={{ marginRight: 5 }}
                  onClick={() => handleFilterClick(4)}
                >
                  {" "}
                  4 stars
                </span>
                <StarIcon></StarIcon> <StarIcon></StarIcon>{" "}
                <StarIcon></StarIcon> <StarIcon></StarIcon>
              </Button>
              <Button className="filterRatingBtn1">
                <span
                  style={{ marginRight: 5 }}
                  onClick={() => handleFilterClick(3)}
                >
                  {" "}
                  3 stars
                </span>{" "}
                <StarIcon></StarIcon> <StarIcon></StarIcon>{" "}
                <StarIcon></StarIcon>
              </Button>
              <Button className="filterRatingBtn1">
                <span
                  style={{ marginRight: 5 }}
                  onClick={() => handleFilterClick(2)}
                >
                  {" "}
                  2 stars
                </span>{" "}
                <StarIcon></StarIcon> <StarIcon></StarIcon>
              </Button>
              <Button className="filterRatingBtn1">
                <span
                  style={{ marginRight: 5 }}
                  onClick={() => handleFilterClick(1)}
                >
                  {" "}
                  1 star
                </span>
                <StarIcon></StarIcon>
              </Button>
            </div>
          ) : (
            <div>
              {" "}
              <p>This expert has no reviews yet.</p>{" "}
            </div>
          )}
        </div>
        <div>
          {!isFilter ? (
            feedbacks.map((feedback, index) => (
              <ExpertDetailReview
                key={index}
                rating={feedback.rating}
                content={feedback.content}
                time={feedback.created_at}
                profile_img={feedback.profile_picture}
                name={feedback.name}
              />
            ))
          ) : feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <ExpertDetailReview
                key={index}
                rating={feedback.rating}
                content={feedback.content}
                time={feedback.created_at}
                profile_img={feedback.profile_picture}
                name={feedback.name}
              />
            ))
          ) : (
            <p style={{ marginTop: 20 }}>This expert has no reviews for this rating yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

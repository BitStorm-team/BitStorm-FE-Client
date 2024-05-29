import "../assets/css/expertDetail.css";
import TopImg from "../assets/images/expertDetail/topExpertImg.png";
import Doctor from "../assets/images/expertDetail/doctor.jpg";
import Stars from "../assets/images/expertDetail/stars.png"
import User from "../assets/images/expertDetail/client1.png";

// import { HeartOutlined } from "../../node_modules/@ant-design/icons-svg/es/index.d.ts";

import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Avatar,
  Typography,
} from "antd";
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
  return (
    <Layout className="fluid-container" style={{ marginBottom: 50 }}>
      <div>
        <div className="top_image">
          <img src={TopImg} alt="Doctor" />
        </div>
        <Content>
          <Row id="cardExpert" className="expert_detail">
            <Col xs={24} md={8} className="doctor_image">
              <img src={Doctor} alt="Doctor" />
            </Col>
            <Col sm={14} xs={24} md={15} className="container_content">
              <h2 className="doctor_job_title">
                Psychologist - <span className="doctor_name">Dr. John Doe</span>{" "}
              </h2>

              <div class="flexStyle">
                <div style={{ paddingRight: 15 }}>
                  <p class="review-rating">4.5</p>
                </div>
                <img src={Stars} alt="Stars" />
                <span
                  style={{
                    width: 2,
                    backgroundColor: "#686D76",
                    height: 22,
                    marginLeft: 15,
                    marginRight: 15,
                  }}
                ></span>
                <p class="review-rating">100 reviews</p>
              </div>
              <div
                class="flexStyle"
                style={{
                  paddingLeft: 50,
                  marginTop: 20,
                  backgroundColor: "#fff0f6",
                  height: 80,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <p className="oldPrice">15$</p>
                <p className="currentPrice">10$</p>
                <div class="discountAnnouce">Apply special discount now!</div>
              </div>
              <h2>Experience</h2>
              <p style={{ marginTop: 20 }}>
                {" "}
                <Typography.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  vel metus at tellus euismod malesuada. Nulla facilisi. Nulla
                  auctor, lectus et suscipit semper, mi sapien laoreet nibh, sit
                  amet laoreet velit tellus eget lacus. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. In vel metus at tellus
                  euismod malesuada. Nulla facilisi. Nulla auctor, lectus et
                  suscipit semper, mi sapien laoreet nibh, sit amet laoreet
                  velit tellus eget lacus.
                </Typography.Paragraph>
              </p>
              <h2>All schedules</h2>
              <div>
                <div className="expert_shedule">
                  <Button className="shedule_button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      style={{ fill: "#007bff", marginRight: 5 }}
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 17h-1v-6l4.25-2.54.75 1.23-3.5 2.11z" />
                    </svg>
                    13 pm - 14 pm
                  </Button>
                  <Button className="shedule_button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      style={{ fill: "#007bff", marginRight: 5 }}
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 17h-1v-6l4.25-2.54.75 1.23-3.5 2.11z" />
                    </svg>
                    13 pm - 14 pm
                  </Button>
                  <Button className="shedule_button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      style={{ fill: "#007bff", marginRight: 5 }}
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 17h-1v-6l4.25-2.54.75 1.23-3.5 2.11z" />
                    </svg>
                    13 pm - 14 pm
                  </Button>
                  <Button className="shedule_button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      style={{ fill: "#007bff", marginRight: 5 }}
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 17h-1v-6l4.25-2.54.75 1.23-3.5 2.11z" />
                    </svg>
                    13 pm - 14 pm
                  </Button>
                  <Button className="shedule_button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      style={{ fill: "#007bff", marginRight: 5 }}
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 17h-1v-6l4.25-2.54.75 1.23-3.5 2.11z" />
                    </svg>
                    13 pm - 14 pm
                  </Button>
                </div>
              </div>
              <div className="favorite_container">
                <h2 style={{ marginRight: 50 }} className="favorite">
                  Add this expert to your favorites list
                </h2>
                <div class="favoriteIcon">
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
              <div className="checkout">
                <button className="checkoutButton">Go to checkout</button>
              </div>
            </Col>
            <Row></Row>
          </Row>
        </Content>
        <div style={{ marginTop: 50 }}></div>
        <div className="containerRelatedExperts">
          <h1 className="titleRelatedExpert">Related experts</h1>
          <div className="wrapper">
            <div className="card">
              <img
                className="card-image"
                src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg"
                alt=""
              />
              <h2>Mr. Mỹ</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium quis libero exercitationem distinctio facere tenetur
                dolore officia aspernatur, eligendi assumenda. Optio possimus ab
                laboriosam, odio aspernatur porro eum consectetur doloribus.
              </p>
              <div className="card-button">
                <button class="custom-btn btn-16">View More</button>
              </div>
            </div>
            <div className="card">
              <img
                className="card-image"
                src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg"
                alt=""
              />
              <h2>Mr. Mỹ</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium quis libero exercitationem distinctio facere tenetur
                dolore officia aspernatur, eligendi assumenda. Optio possimus ab
                laboriosam, odio aspernatur porro eum consectetur doloribus.
              </p>
              <div className="card-button">
                <button class="custom-btn btn-16">View More</button>
              </div>
            </div>
            <div className="card">
              <img
                className="card-image"
                src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg"
                alt=""
              />
              <h2>Mr. Mỹ</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium quis libero exercitationem distinctio facere tenetur
                dolore officia aspernatur, eligendi assumenda. Optio possimus ab
                laboriosam, odio aspernatur porro eum consectetur doloribus.
              </p>
              <div className="card-button">
                <button class="custom-btn btn-16">View More</button>
              </div>
            </div>
            <div className="card">
              <img
                className="card-image"
                src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg"
                alt=""
              />
              <h2>Mr. Mỹ</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium quis libero exercitationem distinctio facere tenetur
                dolore officia aspernatur, eligendi assumenda. Optio possimus ab
                laboriosam, odio aspernatur porro eum consectetur doloribus.
              </p>
              <div className="card-button">
                <button class="custom-btn btn-16">View More</button>
              </div>
            </div>
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
          <div className="container_review_content">
            <div className="userAvatar">
              <Avatar size={64} src={User} />
            </div>
            <div style={{ marginLeft: 10, flex: 1 }}>
              <p style={{ fontWeight: "bold", marginBottom: 5 }}>BQ</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <p style={{ marginBottom: 5 }}>May 2024</p>
              <p style={{ marginBottom: 0 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
                metus at tellus euismod malesuada. Nulla facilisi. Nulla auctor,
                lectus et suscipit semper, mi sapien laoreet nibh, sit amet
                laoreet velit tellus eget lacus. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. In vel metus at tellus euismod
                malesuada. Nulla facilisi. Nulla auctor, lectus et suscipit
                semper, mi sapien laoreet nibh, sit amet laoreet velit tellus
                eget lacus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

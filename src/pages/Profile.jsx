import Banner from "../components/contact/Banner";
import "../assets/css/profile/index.css";
import UserImage from "../assets/images/hollywooddoctors3.jpg";
import {
  ClockCircleFilled,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import Action from "../components/prrofile/Action";
import Schedule from "../components/prrofile/Schedule";
import ScheduleItem from "../components/prrofile/HistoryBooking";

export default function Profile() {
  const schedules = [
    {
      username: "caubecodon",
      date: "30-12-2023",
      time: "13h - 14h",
      price: "300.000",
      link: "20d-405-xdj-dns",
    },
    {
      username: "caubecodon",
      date: "30-12-2023",
      time: "13h - 14h",
      price: "300.000",
      link: "20d-405-xdj-dns",
    },
    {
      username: "caubecodon",
      date: "30-12-2023",
      time: "13h - 14h",
      price: "300.000",
      link: "20d-405-xdj-dns",
    },
  ];
  return (
    <div className="main-profile">
      <Banner
        title="YOUR PROFILE"
        description="We'd love to learn more about you! Please update your profile information below so we can stay connected."
      />
      <div className="profile-container">
        <div className="profile_avtar">
          <div className="img_box">
            <img src={UserImage} alt="User Avatar" />
          </div>
          <div className="name_box_profile">
            <p>
              Hi <span style={{ color: "#3D93FF" }}> Phạm Gia Bảo</span>
            </p>
          </div>
        </div>
        <div className="action_box">
          <Action
            icon={<UserOutlined />}
            title="Personal information"
            description="View and edit your personal information..."
          />
          <Action
            icon={<ClockCircleFilled />}
            title="Personal activity            "
            description="Review the history of your calendars and posts..."
          />
          <Action
            icon={<SettingFilled />}
            title="Personal setting"
            description="Personal information can be edited..."
          />
        </div>
        <div className="btn_create_schedule">
          <button className="btn_create_schedule_btn">
            Create a new schedule
          </button>
        </div>
        <div className="examination_schedule_box">
          <h5>Your examination schedule</h5>
          <div className="schedule_item_box">
            <Schedule time="12pm-13pm" />
            <Schedule time="12pm-13pm" />
            <Schedule time="12pm-13pm" />
            <Schedule time="12pm-13pm" />
            <Schedule time="12pm-13pm" />
            <Schedule time="12pm-13pm" />
            <Schedule time="12pm-13pm" />
          </div>
        </div>
        <div className="examination_booking_history">
          <h5>Scheduled medical appointments</h5>
          <div className="booking_history_item">
            {schedules.map((schedule, index) => (
              <ScheduleItem
                key={index}
                username={schedule.username}
                date={schedule.date}
                time={schedule.time}
                price={schedule.price}
                link={schedule.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

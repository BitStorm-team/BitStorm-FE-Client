import { Button } from "antd";
import Logo from "../components/Logo";
import NavBar from "./NavBar";
import "../assets/css/header.css";

const MainHeader = () => {
  return (
    <header className="main-header">
      <div className="header-section logo">
        <Logo />
      </div>
      <div className="header-section navbar">
        <NavBar />
      </div>
      <div className="header-section buttons">
        <Button type="primary">Sign In</Button>
        <Button type="primary">Sign Up</Button>
      </div>
    </header>
  );
};

export default MainHeader;

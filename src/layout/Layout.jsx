import { Layout, Button } from "antd";
import "../assets/css/layout.css";
import MainHeader from "./Header";
import AppFooter from "./Footer";
const { Footer, Content } = Layout;
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle = {
};

const MainLayout = ({ main }) => {
  return (
    <div>
      <div style={layoutStyle}>
        <MainHeader />
        <Content className="main">
          <main>{main}</main>
        </Content>
        <AppFooter />
      </div>
    </div>
  );
};

export default MainLayout;

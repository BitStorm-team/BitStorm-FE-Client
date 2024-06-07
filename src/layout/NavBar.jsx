import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../assets/css/navbar.css";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const NavBar = ({ isLogin, menuActive, setMenuActive }) => {
  const navItems = ["Home", "Post", "Expert", "ContactUs"];

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        {menuActive ? <CloseOutlined /> : <MenuOutlined />}
      </div>
      <ul className={`navbar-nav ${menuActive ? "active" : ""}`}>
        {navItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <NavLink
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item}
            </NavLink>
          </li>
        ))}
        {!isLogin && (
          <>
            <li className="nav-item">
              <Button type="primary">
                <Link to="/signin">Sign In</Link>
              </Button>
            </li>
            <li className="nav-item">
              <Button type="primary">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

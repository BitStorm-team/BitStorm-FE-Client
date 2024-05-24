import { NavLink } from "react-router-dom";
import "../assets/css/navbar.css";

const NavBar = () => {
  const navItems = ["Home", "Post", "Expert", "About", "Contact"];

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {navItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <NavLink
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

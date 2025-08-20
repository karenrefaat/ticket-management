import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/menu.css";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {!isOpen && "☰"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <NavLink to="/dashboard" activeClassName="active">Home</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/about" activeClassName="active">About Us</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/contact" activeClassName="active">Contact</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/settings" activeClassName="active">Settings</NavLink>
          </li>
          <li className="menu-item">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuBar;

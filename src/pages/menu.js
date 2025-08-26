import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/menu.css";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const customerMenu = [
    { name: "Home", path: "/dashboard" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Settings", path: "/settings" },
  ];

  const adminMenu = [
    { name: "Home", path: "/admin-dashboard" },
    { name: "Salary", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Settings", path: "/settings" },
  ];

  const menuItems = role === "admin" ? adminMenu : customerMenu;

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {!isOpen && "☰"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title" onClick={() => setIsOpen(false)}>
          Menu
        </h2>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li className="menu-item" key={index} onClick={() => setIsOpen(false)}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
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

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
        <h2 className="sidebar-title" onClick ={()=> setIsOpen(false)}>Menu</h2>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Link to="/dashboard" a>Home</Link>
          </li>
          <li className="menu-item">
            <Link to="/about" >About Us</Link>
          </li>
          <li className="menu-item">
            <Link to="/contact" >Contact</Link>
          </li>
          <li className="menu-item">
            <Link to="/settings">Settings</Link>
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

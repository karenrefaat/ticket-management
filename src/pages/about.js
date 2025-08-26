import React from "react";
import "../css/about.css";
import MenuBar from "./menu";

const About = () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const salaryData = {
    admin123: { salary: 12000, date: "2025-08-30", commission: "5%" },
    superadmin: { salary: 15000, date: "2025-08-30", commission: "10%" },
    manager: { salary: 10000, date: "2025-08-30", commission: "7%" },
  };

  const userSalary = salaryData[username];

  return (
    <div className="about-container">
      <MenuBar />
      <div className="main-content">
        {role === "admin" ? (
          <>
            <h1 className="about-title">Salary Details</h1>
            {userSalary ? (
              <div className="about-content">
                <h2>Employee: {username}</h2>
                <p><strong>Salary:</strong> ${userSalary.salary}</p>
                <p><strong>Payment Date:</strong> {userSalary.date}</p>
                <p><strong>Commission:</strong> {userSalary.commission}</p>
              </div>
            ) : (
              <p>No salary information available for this user.</p>
            )}
          </>
        ) : (
          <>
            <h1 className="about-title">About Us</h1>
            <div className="about-content">
              <h2>Our Mission</h2>
              <p>
                We are dedicated to providing exceptional customer service solutions,
                helping businesses resolve customer issues efficiently and effectively.
              </p>
              <h2>Our Team</h2>
              <p>
                Our team consists of experienced professionals committed to delivering
                top-notch support and innovative tools for customer service management.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default About;

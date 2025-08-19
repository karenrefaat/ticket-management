import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/about.css';
import MenuBar from './menu';
const About = () => {
  
  return (
    <div className="about-container">
      {/* ✅ Reusable sidebar */}
      <MenuBar />

      {/* Page-specific content */}
      <div className="main-content">
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
      </div>
    </div>
  );
};

export default About;
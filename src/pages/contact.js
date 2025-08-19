import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/contact.css';
import MenuBar from './menu';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Contact Form Submitted:', data);
    reset();
  };

  return (
    <div className="contact-container">
      {/* ✅ Reusable MenuBar */}
      <MenuBar />

      {/* Page-specific content */}
      <div className="main-content">
        <h1 className="contact-title">Contact Us</h1>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                placeholder="Enter your message"
              />
              {errors.message && <span className="error">{errors.message.message}</span>}
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
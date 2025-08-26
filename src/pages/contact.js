import React from "react";
import { useForm } from "react-hook-form";
import "../css/contact.css";
import MenuBar from "./menu";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const role = localStorage.getItem("role"); // check role (admin or customer)

  const onSubmit = (data) => {
    console.log("Contact Form Submitted:", data);
    reset();
  };

  return (
    <div className="contact-container">
      <MenuBar />
      <div className="main-content">
        <h1 className="contact-title">Contact</h1>

        {/* CUSTOMER FORM */}
        {role === "customer" && (
          <div className="contact-form">
            <h2>Write your message here</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <span className="error">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Enter your message"
                />
                {errors.message && (
                  <span className="error">{errors.message.message}</span>
                )}
              </div>

              <button type="submit">Send Message</button>
            </form>
          </div>
        )}

        {/* ADMIN FORM */}
        {role === "admin" && (
          <div className="contact-form">
            <h2>Message Another Admin</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="recipient">Recipient (Admin Email/Username)</label>
                <input
                  id="recipient"
                  {...register("recipient", { required: "Recipient is required" })}
                  placeholder="Enter admin email or username"
                />
                {errors.recipient && (
                  <span className="error">{errors.recipient.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Problem / Subject</label>
                <input
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Enter problem subject"
                />
                {errors.subject && (
                  <span className="error">{errors.subject.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="details">Details</label>
                <textarea
                  id="details"
                  {...register("details", { required: "Details are required" })}
                  placeholder="Describe the problem..."
                />
                {errors.details && (
                  <span className="error">{errors.details.message}</span>
                )}
              </div>

              <button type="submit">Send to Admin</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;

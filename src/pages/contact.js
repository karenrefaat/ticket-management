import React from "react";
import { useForm } from "react-hook-form";
import "../css/contact.css";
import MenuBar from "./menu";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const role = localStorage.getItem("role");

  const onSubmit = (data) => {
    console.log("Contact Form Submitted:", data);
    reset();
  };

  return (
    <div className="contact-container">
      <MenuBar />
      <div className="main-content">
        <h1 className="contact-title">Contact</h1>

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

        {role === "admin" && (
          <div className="contact-form">
            <h2>Contact Customer</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="recipient">Select Customer</label>
                <select
                  id="recipient"
                  {...register("recipient", { required: "Customer is required" })}
                >
                  <option value="">--Choose Customer--</option>
                  <option value="karenrefaat227">karenrefaat227</option>
                  <option value="john_doe">john_doe</option>
                  <option value="sara">sara</option>
                </select>
                {errors.recipient && (
                  <span className="error">{errors.recipient.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Enter subject (ex: Problem with login)"
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
                  placeholder="Ask customer about problem details..."
                />
                {errors.details && (
                  <span className="error">{errors.details.message}</span>
                )}
              </div>

              <button type="submit">Send to Customer</button>
            </form>
          </div>
        )}

        {role === "admin" && (
          <div className="contact-form">
            <h2>Message Another Admin</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="adminRecipient">Recipient (Admin Email/Username)</label>
                <input
                  id="adminRecipient"
                  {...register("adminRecipient", { required: "Recipient is required" })}
                  placeholder="Enter admin email or username"
                />
                {errors.adminRecipient && (
                  <span className="error">{errors.adminRecipient.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="adminSubject">Subject</label>
                <input
                  id="adminSubject"
                  {...register("adminSubject", { required: "Subject is required" })}
                  placeholder="Enter subject"
                />
                {errors.adminSubject && (
                  <span className="error">{errors.adminSubject.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="adminDetails">Details</label>
                <textarea
                  id="adminDetails"
                  {...register("adminDetails", { required: "Details are required" })}
                  placeholder="Describe the problem..."
                />
                {errors.adminDetails && (
                  <span className="error">{errors.adminDetails.message}</span>
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

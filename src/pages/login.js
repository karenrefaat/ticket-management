import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

export default function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const hardcodedUsers = [
    { username: "karenrefaat227", password: "Karen_227", role: "customer" },
    { username: "john_doe", password: "User123", role: "customer" },
    { username: "sara", password: "Pass_789", role: "customer" },

    { username: "admin123", password: "Admin_123", role: "admin" },
    { username: "superadmin", password: "Root_999", role: "admin" },
    { username: "manager", password: "Mng_456", role: "admin" }
  ];

  const onSubmit = (data) => {
    const { username, password } = data;

    const user = hardcodedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("token", "karen123"); 
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);

      console.log("Login Success:", user.username, "| Role:", user.role);
        navigate("/dashboard");
    
    } else {
      setError("root", { message: "Invalid username or password." });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/imgs/ticketimg.png" alt="Ticket Icon" className="login-icon" />
        <h2 className="login-title">Ticket Manager</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            type="text"
            placeholder="Enter your Username"
            {...register("username", { required: "Username is required" })}
            className="login-input"
          />
          {errors.username && <p className="error-text">{errors.username.message}</p>}

          <input
            type="password"
            placeholder="Enter your Password"
            {...register("password", { required: "Password is required" })}
            className="login-input"
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          {errors.root && <p className="error-text">{errors.root.message}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

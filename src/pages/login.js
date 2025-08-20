import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

export default function Login() {
  const navigate = useNavigate();

  // initialize React Hook Form
  const { register, handleSubmit, formState: { errors }, setError, } = useForm();

  const hardcodedUser = { username: "karenrefaat227", password: "Karen_227" };

  const onSubmit = (data) => {
    const { username, password } = data;
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
      // Save token in localStorage
      localStorage.setItem("token", "karen123");
      console.log("Login: Token set =", localStorage.getItem("token"));
      navigate("/dashboard");
    } else {
      // custom error handling if login fails
      setError("root", { message: "Invalid username or password." });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/imgs/ticketimg.png" alt="Ticket Icon" className="login-icon" />
        <h2 className="login-title">Ticket Manager</h2>

        {/* hook form submit */}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Username */}
          <input
            type="text"
            placeholder="Enter your Username"
            {...register("username", { required: "Username is required" })}
            className="login-input" />
          {errors.username && <p className="error-text">{errors.username.message}</p>}
          {/* Password */}
          <input
            type="password"
            placeholder="Enter your Password"
            {...register("password", { required: "Password is required" })}
            className="login-input" />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
          {/* Root (custom) error */}
          {errors.root && <p className="error-text">{errors.root.message}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

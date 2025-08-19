import React from 'react';
import { useForm } from 'react-hook-form';
import '../css/settings.css';
import MenuBar from './menu';

const Settings = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Settings Updated:', data);
    reset();
  };

  return (
    <div className="settings-container">
      {/* ✅ Reusable sidebar (already has handleLogout inside menu.js) */}
      <MenuBar />

      {/* Page-specific content */}
      <div className="main-content">
        <h1 className="settings-title">Settings</h1>

        <div className="settings-form">
          <h2>Update Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                {...register("username", { required: "Username is required" })}
                placeholder="Enter your username"
              />
              {errors.username && <span className="error">{errors.username.message}</span>}
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
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                placeholder="Enter new password (optional)"
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;

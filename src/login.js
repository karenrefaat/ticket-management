import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ticketIcon from "./ticketimg.png";
import "./login.css";
export default function Login() {
    const navigate = useNavigate();
    // State variables for username, password, and error message
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const hardcodedUser = { username: "karenrefaat227", password: "Karen_227" };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate input
        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (username === hardcodedUser.username && password === hardcodedUser.password) {
            setError("");
            navigate("/dashboard");
        } else {
            setError("Invalid username or password.");
        }
    };
    // Render the login form
    return (
        <div className="login-container">
            <div className="login-card">
                <img src={ticketIcon} alt="Ticket Icon" className="login-icon" />
                <h2 className="login-title">Ticket Manager</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="text" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" />
                    <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
}

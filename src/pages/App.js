import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import Contact from "./contact";
import About from "./about";
import Settings from "./settings";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && token !== "null" && token !== "undefined" && token !== "";
  console.log("ProtectedRoute: token =", token, "| isAuthenticated =", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && token !== "null" && token !== "undefined" && token !== "";
  console.log("PublicRoute: token =", token, "| isAuthenticated =", isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const RouteDebugger = () => {
  const location = useLocation();
  React.useEffect(() => {
    console.log("Route changed to:", location.pathname);
  }, [location]);
  return null;
};

export default function App() {
  // Removed token clearing to allow persistent login sessions
  return (
    <Router>
      <RouteDebugger />
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

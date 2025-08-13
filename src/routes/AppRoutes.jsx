import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import OtpVerify from "../pages/auth/OtpVerify";

// We’ll add protected routes and dashboards later
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-verify" element={<OtpVerify />} />

      {/* sample placeholders for later */}
      <Route path="/admin" element={<div>Admin Dashboard</div>} />
      <Route path="/delivery" element={<div>Delivery Dashboard</div>} />
      <Route path="/dashboard" element={<div>User Dashboard</div>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

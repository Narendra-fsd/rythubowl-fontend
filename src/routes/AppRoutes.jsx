import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import OtpVerify from '../pages/auth/OtpVerify';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ForgotPasswordOtp from '../pages/auth/ForgotPasswordOtp';
import ResetPassword from '../pages/auth/ResetPassword';
import Home from "../components/Home";
import About from '../components/About'

// We’ll add protected routes and dashboards later
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-verify" element={<OtpVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-forgot-otp" element={<ForgotPasswordOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* sample placeholders for later */}
      {/* <Route path="/admin" element={<div>Admin Dashboard</div>} />
      <Route path="/delivery" element={<div>Delivery Dashboard</div>} /> */}
      

      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  );
};

export default AppRoutes;

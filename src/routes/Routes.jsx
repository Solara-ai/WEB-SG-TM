import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Calendar from "../pages/Calendar/Calendar";
import UserProfile from "../pages/UserProfile/UserProfile";
import UserManagement from "../pages/UserManagement/UserManagement";
import Feedback from "../pages/UserManagement/Feedback";
import { getToken } from "../utils/auth";

// ✅ Protected Route: Chỉ cho phép truy cập nếu có token
const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    console.warn("Unauthorized access! Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ✅ Kiểm tra token khi app khởi chạy
const AuthChecker = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.warn("No token found! Redirecting to login...");
      navigate("/login");
    }
    else {
      setLoading(false); 
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
};

const AppRouter = () => {
  return (
      <Router>
        <AuthChecker /> {/* ✅ Kiểm tra token ngay khi app load */}
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />

          {/* 🔄 Redirect tất cả đường dẫn không hợp lệ về Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
  );
};

export default AppRouter;

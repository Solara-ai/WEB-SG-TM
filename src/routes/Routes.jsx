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
      console.warn("No valid token found! Redirecting to login...");
      navigate("/login");
    } else {
      // Kiểm tra nếu token có thể đã hết hạn
      const isTokenExpired = checkTokenExpiration(token);
      if (isTokenExpired) {
        console.warn("Token expired! Redirecting to login...");
        localStorage.removeItem("token"); // Xóa token hết hạn
        navigate("/login");
      } else {
        setLoading(false);
      }
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
}

// ✅ Hàm kiểm tra token có hết hạn không
const checkTokenExpiration = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Giải mã JWT token
    const exp = payload.exp * 1000; // Chuyển đổi thời gian hết hạn từ giây sang mili giây
    return Date.now() > exp; // Nếu thời gian hiện tại vượt quá thời gian hết hạn => token hết hạn
  } catch (error) {
    console.error("Invalid token format:", error);
    return true; // Nếu có lỗi khi kiểm tra, coi như token không hợp lệ
  }
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

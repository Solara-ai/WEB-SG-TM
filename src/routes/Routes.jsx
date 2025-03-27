import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Calendar from "../pages/Calendar/Calendar";
import UserProfile from "../pages/UserProfile/UserProfile";
<<<<<<< HEAD
import UserManagement from "../pages/UserManagement/UserManagement"; // Import UserManagement
//import ProtectedRoute from "../ProtectedRoute";
//import { AuthProvider } from "../context/AuthContext";

// Protected temp
=======
import UserManagement from "../pages/UserManagement/UserManagement";
import { getToken } from "../utils/auth";

// ✅ Protected Route: Chỉ cho phép truy cập nếu có token
>>>>>>> bdd4814a186a5c25093e6c288f1306c9c497e4b6
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

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.warn("No token found! Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

const AppRouter = () => {
  return (
<<<<<<< HEAD
    //<AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
=======
      <Router>
        <AuthChecker /> {/* ✅ Kiểm tra token ngay khi app load */}
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Protected Routes */}
>>>>>>> bdd4814a186a5c25093e6c288f1306c9c497e4b6
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />

<<<<<<< HEAD
          {/* Catch all route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    //</AuthProvider>
=======
          {/* 🔄 Redirect tất cả đường dẫn không hợp lệ về Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
>>>>>>> bdd4814a186a5c25093e6c288f1306c9c497e4b6
  );
};

export default AppRouter;
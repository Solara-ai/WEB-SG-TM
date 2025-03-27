import { useState } from "react";
import { /* Link,*/ useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { login } from "../../api/AuthenApi";
//import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  //const { login: authenticate } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });


  const [error, setError] = useState(""); // State để hiển thị lỗi nếu có

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi trước khi gửi request
  
    try {

      const response = await login(formData.email, formData.password, formData.rememberMe);
  
      if (response && response.data.token) {
        // Lưu trạng thái đăng nhập dựa trên "Remember Me"
        if (formData.rememberMe) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        } else {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("token", response.data.token);
        }
  
        navigate("/");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };


  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/back_ground.jpg')",
          opacity: 0.6,
          zIndex: 0,
        }}
      ></div>

      <motion.div
        className="max-w-md w-full mx-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{ zIndex: 1 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  className="font-medium text-gray-600 hover:text-green-500"
                  onClick={() => alert("Password reset functionality coming soon!")}
                >
                  Forgot your password?
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </form>

          {/* <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-gray-600 hover:text-green-500">
                Sign up
              </Link>
            </p>
          </div> */}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;

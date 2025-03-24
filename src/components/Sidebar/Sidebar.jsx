import { FaHome, FaCalendarAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <motion.div
      className="h-screen w-64 bg-gray-800 text-white flex flex-col p-5"
      initial={initialRender ? { x: -100, opacity: 0 } : false}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <FaHome /> <span>Home</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/calendar"
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <FaCalendarAlt /> <span>Calendar</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <FaUser /> <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <motion.button
        onClick={handleLogout}
        className="mt-auto flex items-center space-x-2 text-red-500 hover:text-red-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaSignOutAlt /> <span>Logout</span>
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;
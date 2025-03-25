import { FaHome, FaCalendarAlt, FaUser, FaSignOutAlt, FaUsers, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <motion.div
      className={`h-screen bg-gray-800 text-white flex flex-col p-5 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-6 text-white hover:text-gray-300 self-end"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
          <FaBars size={20} />
        </motion.div>
      </motion.button>

      {/* Sidebar Title */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.h2
            className="text-xl font-bold mb-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            Admin Dashboard
          </motion.h2>
        )}
      </AnimatePresence>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul>
          {[
            { path: "/", label: "Home", icon: <FaHome /> },
            { path: "/calendar", label: "Calendar", icon: <FaCalendarAlt /> },
            { path: "/users", label: "User Management", icon: <FaUsers /> },
            { path: "/profile", label: "Profile", icon: <FaUser /> },
          ].map(({ path, label, icon }) => (
            <motion.li
              key={path}
              className="mb-4"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
              transition={{ duration: 0.2 }}
            >
              <Link to={path} className="flex items-center space-x-2 p-2">
                {icon}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        className="mt-auto flex items-center space-x-2 text-red-500 hover:text-red-300 p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaSignOutAlt />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              Logout
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;

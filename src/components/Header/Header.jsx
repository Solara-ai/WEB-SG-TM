//import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/calendar":
        return "Calendar";
      case "/profile":
        return "Profile";
      case "/users":
        return "User Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-gray-700 to-white shadow-lg p-5 flex justify-between items-center text-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-2xl font-bold tracking-wide"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {getTitle()}
      </motion.h1>
      {/* <motion.div 
        className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-md text-gray-800"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center space-x-2"
        >
          <FaUserCircle className="text-blue-600 text-3xl" />
          <span className="text-lg font-semibold">Admin</span>
        </motion.div>
      </motion.div> */}
    </motion.div>
  );
};

export default Header;
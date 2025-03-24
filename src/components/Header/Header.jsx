import { FaUserCircle } from "react-icons/fa";
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
      default:
        return "Dashboard";
    }
  };

  return (
    <motion.div 
      className="bg-white shadow-md p-4 flex justify-between items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-xl font-semibold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {getTitle()}
      </motion.h1>
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaUserCircle className="text-gray-700 text-2xl" />
        </motion.div>
        <span>Admin</span>
      </motion.div>
    </motion.div>
  );
};

export default Header;
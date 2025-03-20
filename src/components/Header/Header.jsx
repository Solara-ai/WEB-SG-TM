import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-3">
        <FaUserCircle className="text-gray-700 text-2xl" />
        <span>Admin</span>
      </div>
    </div>
  );
};

export default Header;
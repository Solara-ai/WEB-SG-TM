import { useState, useEffect } from "react";
import {
  FaSearch,
  FaEye,
  FaTimes,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { usersData } from "../../services/userService";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Filter users immediately after search input changes
  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Reset current page to 1 when search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Header />
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">User Management</h2>

          {/* Search & Pagination Container */}
          <motion.div className="mb-4 flex items-center justify-end space-x-4">
            <select
              className="bg-white shadow p-3 rounded-lg"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <motion.div className="flex items-center bg-white shadow p-3 rounded-lg w-72">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full p-2 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </motion.div>
          </motion.div>

          {/* User Table */}
          <div className="overflow-auto bg-white shadow-lg rounded-lg max-h-[70vh]">
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 bg-gray-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Registered Date</th>
                  <th className="p-3">Schedules Created</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        className="border-b transition cursor-pointer"
                      >
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.phoneNumber}</td>
                        <td className="p-3">{user.registeredAt}</td>
                        <td className="p-3 text-center">{user.createdSchedules}</td>
                        <td className="p-3 text-center">
                          <motion.button
                            whileHover={{ scale: 1.2, backgroundColor: "#2563eb" }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                            onClick={() => setSelectedUser(user)}
                          >
                            <FaEye className="inline-block" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <td colSpan="7" className="text-center p-4 text-gray-500">No users found.</td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
<div className="flex justify-center items-center mt-4 space-x-2">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`px-3 py-2 rounded-lg shadow ${
      currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
    }`}
  >
    Prev
  </button>

  {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-3 py-2 rounded-lg shadow ${
        currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredUsers.length / itemsPerPage)))}
    disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
    className={`px-3 py-2 rounded-lg shadow ${
      currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-blue-500 text-white"
    }`}
  >
    Next
  </button>
</div>


        {/* Modal for Viewing User Details */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 rounded-2xl shadow-2xl w-96"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-500" /> User Details
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaUser className="text-gray-500" /> <strong>Name:</strong>{" "}
                  {selectedUser.name}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" />{" "}
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-500" /> <strong>Phone:</strong>{" "}
                  {selectedUser.phoneNumber}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" />{" "}
                  <strong>Registered:</strong> {selectedUser.registeredAt}
                </p>
                <p className="flex items-center gap-2">
                  <FaClipboardList className="text-gray-500" />{" "}
                  <strong>Schedules Created:</strong>{" "}
                  {selectedUser.createdSchedules}
                </p>                
              </div>
              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#e53e3e" }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  onClick={() => setSelectedUser(null)}
                >
                  <FaTimes /> Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserManagement;

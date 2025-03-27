import { useState, useEffect } from "react";
import {
  FaSearch,
  FaEye,
  FaTimes,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaCheck,
  FaEllipsisV,
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
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  // Filter users immediately after search input changes
  const filteredUsers = usersData.filter(
    (user) =>
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(search.toLowerCase()))
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            User Management
          </h2>

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
                  <th className="p-3 text-center">ID</th>
                  <th className="p-3 text-center">Username</th>
                  <th className="p-3 text-center">Full Name</th>
                  <th className="p-3 text-center">Gender</th>
                  <th className="p-3 text-center">Email</th>
                  <th className="p-3 text-center">Phone</th>
                  <th className="p-3 text-center">Created At</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                
                <AnimatePresence>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="border-b transition cursor-pointer hover:shadow-md"
                      >
                        <td className="p-4 text-center font-medium text-gray-700">
                          {user.id}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.username}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.firstname} {user.lastname}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.gender}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.email}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.phone}
                        </td>
                        <td className="p-4 text-center text-gray-500 text-sm">
                          {user.createdAt}
                        </td>
                        <td className="p-4 text-center relative">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray px-3 py-2 rounded-md "
                            onClick={() =>
                              setOpenMenu(openMenu === user.id ? null : user.id)
                            }
                          >
                            <FaEllipsisV />
                          </motion.button>
                        </td>
                        {openMenu === user.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden z-10">
                            <motion.button
                              whileHover={{ backgroundColor: "#2563eb" }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-white transition"
                              onClick={() => {
                                setSelectedUser(user);
                                setOpenMenu(null);
                              }}
                            >
                              <FaEye /> View
                            </motion.button>
                            <motion.button
                              whileHover={{ backgroundColor: "#f59e0b" }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-white transition"
                              onClick={() => {
                                setEditingUser(user);
                                setOpenMenu(null);
                              }}
                            >
                              <FaEdit /> Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ backgroundColor: "#dc2626" }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-white transition"
                              onClick={() => {
                                setDeletingUser(user);
                                setOpenMenu(null);
                              }}
                            >
                              <FaTrash /> Delete
                            </motion.button>
                          </div>
                        )}
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td
                        colSpan="8"
                        className="text-center p-6 text-gray-500 text-lg"
                      >
                        No users found.
                      </td>
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
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Prev
          </button>

          {Array.from(
            { length: Math.ceil(filteredUsers.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-2 rounded-lg shadow ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredUsers.length / itemsPerPage)
                )
              )
            }
            disabled={
              currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
            }
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
                  <FaUser className="text-gray-500" />{" "}
                  <strong>Username:</strong> {selectedUser.username}
                </p>
                <p className="flex items-center gap-2">
                  <FaUser className="text-gray-500" />{" "}
                  <strong>Full Name:</strong> {selectedUser.firstname}{" "}
                  {selectedUser.lastname}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" />{" "}
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-500" />{" "}
                  <strong>Phone:</strong> {selectedUser.phone}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" />{" "}
                  <strong>Created At:</strong> {selectedUser.createdAt}
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

        {/* Modal for Editing User */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 rounded-2xl shadow-2xl w-96"
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FaEdit className="text-yellow-500" /> Edit User
              </h2>

              <div className="space-y-3 mt-4">
                <div>
                  <label className="text-gray-600 text-sm">User ID</label>
                  <input
                    className="border p-2 w-full mt-1 bg-gray-100 cursor-not-allowed"
                    value={editingUser.id}
                    disabled
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Username</label>
                  <input
                    className="border p-2 w-full mt-1"
                    value={editingUser.username}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        username: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Full Name</label>
                  <input
                    className="border p-2 w-full mt-1"
                    value={`${editingUser.firstname} ${editingUser.lastname}`}
                    onChange={(e) => {
                      const [firstname, lastname] = e.target.value.split(" ");
                      setEditingUser({ ...editingUser, firstname, lastname });
                    }}
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Gender</label>
                  <select
                    className="border p-2 w-full mt-1"
                    value={editingUser.gender}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, gender: e.target.value })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Email</label>
                  <input
                    className="border p-2 w-full mt-1"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Phone</label>
                  <input
                    className="border p-2 w-full mt-1"
                    value={editingUser.phone}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Created At</label>
                  <input
                    className="border p-2 w-full mt-1 bg-gray-100 cursor-not-allowed"
                    value={editingUser.createdAt}
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#38a169" }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaCheck /> Save
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#a0aec0" }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 ml-2"
                  onClick={() => setEditingUser(null)}
                >
                  <FaTimes /> Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal for Confirm Delete */}
        {deletingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 rounded-2xl shadow-2xl w-96"
            >
              <h2 className="text-2xl font-semibold text-red-500 flex items-center gap-2">
                <FaTrash /> Confirm Delete
              </h2>
              <p>Are you sure you want to delete this user?</p>
              <div className="space-y-2 text-gray-700 mt-4">
                <p>
                  <strong>ID:</strong> {deletingUser.id}
                </p>
                <p>
                  <strong>Username:</strong> {deletingUser.username}
                </p>
                <p>
                  <strong>Full Name:</strong> {deletingUser.firstname}{" "}
                  {deletingUser.lastname}
                </p>
                <p>
                  <strong>Gender:</strong> {deletingUser.gender}
                </p>
                <p>
                  <strong>Email:</strong> {deletingUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {deletingUser.phone}
                </p>
                <p>
                  <strong>Created At:</strong> {deletingUser.createdAt}
                </p>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "##ff8181" }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 ml-2"
                >
                  <FaCheck /> Delete
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#a0aec0" }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 ml-2"
                  onClick={() => setDeletingUser(null)}
                >
                  <FaTimes /> Cancel
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

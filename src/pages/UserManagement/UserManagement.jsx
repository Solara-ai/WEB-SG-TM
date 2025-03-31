import { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { getAllUsers } from "../../api/UserApi";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const response = await getAllUsers();
      if (response.isSuccess() && response.data) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users: ", response.resultMsg);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(search.toLowerCase()))
  );

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

          <div className="overflow-auto bg-white shadow-lg rounded-lg max-h-[70vh]">
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 bg-gray-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="p-3 text-center">#</th>
                  <th className="p-3 text-center">Name</th>
                  <th className="p-3 text-center">Email</th>
                  <th className="p-3 text-center">Phone</th>
                  <th className="p-3 text-center">Gender</th>
                  <th className="p-3 text-center">Birthday</th>
                  <th className="p-3 text-center">Created At</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border-b transition cursor-pointer hover:shadow-md"
                      >
                        <td className="p-4 text-center font-medium text-gray-700">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.name}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.email}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.phone}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.gender}
                        </td>
                        <td className="p-4 text-center text-gray-600">
                          {user.birthday}
                        </td>
                        <td className="p-4 text-center text-gray-500 text-sm">
                          {user.createdAt}
                        </td>
                        <td className="p-4 text-center relative">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="text-gray px-3 py-2 rounded-md"
                            onClick={() =>
                              setOpenMenu(openMenu === user.id ? null : user.id)
                            }
                          >
                            <FaEllipsisV />
                          </motion.button>
                        </td>
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
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaBirthdayCake,
  FaBriefcase,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { register } from "../../api/AuthenApi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    hobbies: "",
    occupation: "",
    birthday: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(
        formData.fullName,
        formData.email,
        formData.password,
        formData.phone,
        formData.gender,
        formData.hobbies,
        formData.occupation,
        formData.birthday
      );
      navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
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
        whileHover={{ scale: 1.02 }}
        className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8 transform transition duration-500 hover:shadow-2xl"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Create an Account
          </h2>
          <p className="text-gray-600 mt-2">Join us today!</p>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              label: "Full Name",
              type: "text",
              icon: <FaUser />,
              field: "fullName",
              placeholder: "Enter your full name",
            },
            {
              label: "Email Address",
              type: "email",
              icon: <FaEnvelope />,
              field: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Password",
              type: "password",
              icon: <FaLock />,
              field: "password",
              placeholder: "Enter a strong password",
            },
            {
              label: "Phone Number",
              type: "tel",
              icon: <FaPhone />,
              field: "phone",
              placeholder: "Enter your phone number",
            },
            {
              label: "Occupation",
              type: "text",
              icon: <FaBriefcase />,
              field: "occupation",
              placeholder: "Enter your occupation",
            },
            {
              label: "Birthday",
              type: "date",
              icon: <FaBirthdayCake />,
              field: "birthday",
              placeholder: "",
            },
          ].map(({ label, type, icon, field, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <motion.div whileFocus={{ scale: 1.05 }} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  {icon}
                </div>
                <input
                  type={type}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  placeholder={placeholder}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                  required
                />
              </motion.div>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hobbies
            </label>
            <input
              type="text"
              value={formData.hobbies}
              onChange={(e) =>
                setFormData({ ...formData, hobbies: e.target.value })
              }
              placeholder="E.g., Reading, Traveling"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
          >
            Sign Up
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;

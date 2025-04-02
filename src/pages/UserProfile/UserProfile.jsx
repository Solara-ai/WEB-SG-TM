import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaUserTie,
  FaHeart,
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { getProfile } from "../../api/ProfileApi";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    hobbies: "",
    occupation: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        if (response && response.isSuccess()) {
          const profileData = response.data;
          setProfile({
            id: profileData.id,
            fullName: profileData.fullName,
            email: profileData.email,
            phone: profileData.phone,
            birthday: profileData.birthday,
            gender: profileData.gender,
            hobbies: profileData.hobbies,
            occupation: profileData.occupation,
          });
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const ProfileField = ({ label, value, icon }) => {
    return (
      <motion.div 
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="flex items-center space-x-3 p-2"
      >
        {icon && <span className="text-gray-400">{icon}</span>}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type="text"
            value={value}
            readOnly
            className="w-full p-3 rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen bg-gray-100"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="w-full h-full">
          <div className="bg-white shadow-md overflow-hidden h-full">
            <div className="relative h-40 bg-gradient-to-r from-gray-500 to-gray-700 flex">
              <motion.div 
                className="absolute -bottom-16 left-8"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <img
                    src="./Logo.png"
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                  <motion.button 
                    whileHover={{ rotate: 10 }}
                    className="absolute bottom-0 right-0 bg-gray-600 p-2 rounded-full text-white hover:bg-green-700"
                  >
                    <FaCamera />
                  </motion.button>
                </div>
              </motion.div>
            </div>
            <div className="pt-20 px-8 pb-8 h-full">
              <form
                onSubmit={handleUpdateProfile}
                className="h-full flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField label="Full Name" value={profile.fullName} />
                    <ProfileField label="Gender" value={profile.gender} />
                    <ProfileField label="Email" value={profile.email} icon={<FaEnvelope />} />
                    <ProfileField label="Phone" value={profile.phone} icon={<FaPhone />} />
                    <ProfileField label="Birthday" value={profile.birthday} icon={<FaBirthdayCake />} />
                    <ProfileField label="Hobbies" value={profile.hobbies} icon={<FaHeart />} />
                    <ProfileField label="Occupation" value={profile.occupation} icon={<FaUserTie />} />
                  </div>

                  <div className="mt-8 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    type="submit"
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </motion.button>
                </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;

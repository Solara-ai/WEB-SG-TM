import { useState, useEffect } from "react";
import { FaCamera, FaEnvelope, FaPhone, FaBirthdayCake, FaUserTie, FaHeart } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { getProfile } from "../../api/ProfileApi";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    hobbies: "",
    occupation: ""
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        if (response && response.isSuccess()) {
          const profileData = response.data; // Lấy profile từ BaseResponse
          setProfile({
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-gray-500 to-white-600">
                <div className="absolute -bottom-16 left-8">
                  <div className="relative">
                    <img
                      src="./Logo.png"
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-gray-600 p-2 rounded-full text-white hover:bg-green-700">
                      <FaCamera />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-20 px-8 pb-8">
                <form onSubmit={handleUpdateProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <input
                        type="text"
                        value={profile.gender}
                        readOnly
                        className="w-full p-3 border rounded-lg bg-gray-100"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaBirthdayCake className="text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
                        <input
                          type="date"
                          value={profile.birthday}
                          onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaHeart className="text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies</label>
                        <input
                          type="text"
                          value={profile.hobbies}
                          onChange={(e) => setProfile({ ...profile, hobbies: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaUserTie className="text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                        <input
                          type="text"
                          value={profile.occupation}
                          onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

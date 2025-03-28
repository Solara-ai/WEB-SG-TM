import { useState } from 'react';
import { FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Solara',
    email: 'Solara@example.com',
    phone: '+84 (987) 12-3456',
    address: 'Trinh Van Bo Street, Ha Noi City',
    role: 'Administrator',
    avatar: './Logo.png'
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile Header */}
              <div className="relative h-48 bg-gradient-to-r from-gray-500 to-white-600">
                <div className="absolute -bottom-16 left-8">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-gray-600 p-2 rounded-full text-white hover:bg-green-700">
                      <FaCamera />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-20 px-8 pb-8">
                <form onSubmit={handleUpdateProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={profile.role}
                        readOnly
                        className="w-full p-3 border rounded-lg bg-gray-100"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center space-x-3">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
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
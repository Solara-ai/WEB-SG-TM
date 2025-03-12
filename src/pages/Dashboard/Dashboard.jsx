import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Message */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome to the Dashboard</h2>
            <p className="text-gray-600 mt-2">
              Manage your tasks and schedules efficiently.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-gray-800">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">1,250</p>
              </div>
              <span className="bg-blue-100 text-blue-600 p-3 rounded-full">
                📊
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-gray-800">Revenue</h3>
                <p className="text-3xl font-bold text-green-600">$45,320</p>
              </div>
              <span className="bg-green-100 text-green-600 p-3 rounded-full">
                💰
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-gray-800">New Orders</h3>
                <p className="text-3xl font-bold text-yellow-600">340</p>
              </div>
              <span className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
                📦
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-gray-800">Active Users</h3>
                <p className="text-3xl font-bold text-red-600">890</p>
              </div>
              <span className="bg-red-100 text-red-600 p-3 rounded-full">
                👥
              </span>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 border-b border-gray-200">
                <span className="text-gray-600">John Doe placed a new order.</span>
                <span className="text-sm text-gray-400">2 mins ago</span>
              </li>
              <li className="flex items-center justify-between p-3 border-b border-gray-200">
                <span className="text-gray-600">New user registered: Alice Johnson.</span>
                <span className="text-sm text-gray-400">10 mins ago</span>
              </li>
              <li className="flex items-center justify-between p-3">
                <span className="text-gray-600">Server maintenance scheduled for 10 PM.</span>
                <span className="text-sm text-gray-400">30 mins ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

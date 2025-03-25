import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { getUserStats } from "../../services/userService";

const Dashboard = () => {
  const [totalSchedules, setTotalSchedules] = useState(0);
  const [aiUsageData, setAiUsageData] = useState({ used: 0, notUsed: 0 });
  const [accountStatusData, setAccountStatusData] = useState({
    active: 0,
    inactive: 0,
  });
  const [dailySchedules, setDailySchedules] = useState([]);

  useEffect(() => {
    const stats = getUserStats();
    setTotalSchedules(stats.totalSchedules);
    setAiUsageData(stats.aiUsage);
    setAccountStatusData(stats.accountStatus);

    // Convert schedulesByDate to array format for the chart
    const dailyData = Object.entries(stats.schedulesByDate)
      .map(([date, schedules]) => ({
        day: new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        schedules,
        fullDate: date,
      }))
      .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))
      .slice(-7); // Get last 7 days

    setDailySchedules(dailyData);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="h-screen w-64 flex-shrink-0" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header className="sticky top-0 z-50 bg-white shadow-xl" />
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome to the Dashboard
            </h2>
            <p className="text-gray-600 mt-2">
              Overview of your system's performance and usage statistics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Total Schedules",
                value: totalSchedules,
                color: "text-blue-600",
                icon: "📅",
              },
              {
                title: "AI Usage",
                value: aiUsageData.used,
                extra: aiUsageData.notUsed,
                color: "text-green-600",
                icon: "🤖",
              },
              {
                title: "Account Status",
                value: accountStatusData.active,
                extra: accountStatusData.inactive,
                color: "text-purple-600",
                icon: "👥",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between hover:shadow-xl transform transition-transform hover:scale-105"
              >
                <div>
                  <h3 className="text-xl font-medium text-gray-800">
                    {item.title}
                  </h3>
                  <p className={`text-3xl font-bold ${item.color}`}>
                    {item.value}
                  </p>
                  {item.extra !== undefined && (
                    <p className="text-lg text-gray-500">
                      {item.extra}{" "}
                      {item.title === "AI Usage" ? "Not Using AI" : "Inactive"}
                    </p>
                  )}
                </div>
                <span className="p-3 text-3xl">{item.icon}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "AI Usage Distribution",
                data: [
                  { name: "Using AI", value: aiUsageData.used },
                  { name: "Not Using AI", value: aiUsageData.notUsed },
                ],
                colors: ["#0088FE", "#FF8042"],
              },
              {
                title: "Account Status Distribution",
                data: [
                  { name: "Active", value: accountStatusData.active },
                  { name: "Inactive", value: accountStatusData.inactive },
                ],
                colors: ["#28A745", "#DC3545"],
              },
            ].map((chart, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {chart.title}
                </h3>
                <ResponsiveContainer height={300}>
                  <PieChart>
                    <Pie
                      data={chart.data}
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {chart.colors.map((color, i) => (
                        <Cell key={i} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Schedules Created by Date
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailySchedules}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="schedules"
                  fill="#82ca9d"
                  animationDuration={500}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";
import { getUserStats, usersData } from "../../services/userService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { User, CalendarCheck } from "lucide-react";

// const COLORS = ["#8884d8", "#82ca9d"];

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersWithSchedules, setUsersWithSchedules] = useState(0);
  const [usersWithoutSchedules, setUsersWithoutSchedules] = useState(0);
  const [dailySchedules, setDailySchedules] = useState([]);
  const [monthlySchedules, setMonthlySchedules] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);

  useEffect(() => {
    const stats = getUserStats();
    setTotalUsers(usersData.length);
    setUsersWithSchedules(stats.usersWithSchedules);
    setUsersWithoutSchedules(usersData.length - stats.usersWithSchedules);

    setDailySchedules(
      Object.entries(stats.schedulesByDate)
        .map(([date, schedules]) => ({
          day: new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          schedules,
        }))
        .slice(-7)
    );

    setMonthlySchedules(
      Object.entries(stats.schedulesByMonth).map(([month, schedules]) => ({
        month,
        schedules,
      }))
    );

    setUserGrowth(stats.userGrowthByMonth);
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
          >
            <h2 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <User className="w-10 h-10 text-blue-500" />
                <span className="text-2xl font-bold">{totalUsers}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users with Schedules</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <CalendarCheck className="w-10 h-10 text-green-500" />
                <span className="text-2xl font-bold">
                  {usersWithSchedules} (
                  {((usersWithSchedules / totalUsers) * 100).toFixed(1)}%)
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users without Schedules</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <CalendarCheck className="w-10 h-10 text-red-500" />
                <span className="text-2xl font-bold">
                  {usersWithoutSchedules} (
                  {((usersWithoutSchedules / totalUsers) * 100).toFixed(1)}%)
                </span>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedules Created (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dailySchedules}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="schedules" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedules Created (Monthly)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlySchedules}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="schedules" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>User Growth (Monthly)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={userGrowth}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="growth"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { getTotalUsers,getUsersWithSchedules,getUsersWithConversationPercentage,getChatCountLast7Days,getSchedulesCountLast3Months,getNewUsersLast3Months  } from "../../services/stats_service"; // Gọi API từ file service
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { motion } from "framer-motion";
import { User, CalendarCheck } from "lucide-react";

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
const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(null); // Để null thay vì 0 ban đầu
  const [Userschedule, setUserschedule] = useState(null);
  const [userconversation, setUserconversation] = useState([]);
  const [chatCountLast7Days, setChatCountLast7Days] = useState([]);
  const [schedulesCountLast3Months, setSchedulesCountLast3Months] = useState([]);
  const [newUsersLast3Months, setNewUsersLast3Months] = useState([]);

  // định nghĩa dữ liệu tĩnhh
  const [userGrowth, setUserGrowth] = useState([]);


  useEffect(() => {
    const fetch = async () => {
      const total = await getTotalUsers();
      setTotalUsers(total); // Trả về giá trị chính xác từ API

      const userschedule = await getUsersWithSchedules();
      setUserschedule(userschedule);

      const conversation = await getUsersWithConversationPercentage();
      setUserconversation(conversation);

      const chatCount = await getChatCountLast7Days();
      setChatCountLast7Days(chatCount);

      const schedulesCount = await getSchedulesCountLast3Months();
      setSchedulesCountLast3Months(schedulesCount);

      const newUsers = await getNewUsersLast3Months();
      setNewUsersLast3Months(newUsers);
    };
    fetch();
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
                <span className="text-2xl font-bold">
                  {totalUsers !== null ? totalUsers : "Loading..."} {/* Hiển thị "Loading..." khi API chưa trả về */}
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users without Schedules</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <CalendarCheck className="w-10 h-10 text-green-500" />
                <span className="text-2xl font-bold">
                  {Userschedule} (
                  {((Userschedule / totalUsers) * 100).toFixed(1)}%)
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

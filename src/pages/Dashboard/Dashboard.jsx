import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
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
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllUsers } from "../../api/UserApi";

const COLORS = ["#0088FE", "#FF69B4"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    usersByGender: {},
    usersThisWeek: [],
    usersThisMonth: [],
    userRegistrationsByMonth: [],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getAllUsers();
      if (response.isSuccess() && response.data) {
        const users = response.data;
        const totalUsers = users.length;

        // Phân loại theo giới tính
        const usersByGender = users.reduce((acc, user) => {
          acc[user.gender] = (acc[user.gender] || 0) + 1;
          return acc;
        }, {});

        const now = new Date();

        // Dữ liệu cho tuần này
        const weekDays = Array.from({ length: 7 }, (_, i) => {
          const day = new Date();
          day.setDate(now.getDate() - i);
          return { date: day.toISOString().split("T")[0], count: 0 };
        }).reverse();

        users.forEach((user) => {
          const userDate = new Date(user.createdAt).toISOString().split("T")[0];
          const day = weekDays.find((d) => d.date === userDate);
          if (day) day.count++;
        });

        // Dữ liệu cho tháng này
        const daysInMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();
        const monthDays = Array.from({ length: daysInMonth }, (_, i) => ({
          day: i + 1,
          count: 0,
        }));

        users.forEach((user) => {
          const userDate = new Date(user.createdAt);
          if (userDate.getMonth() === now.getMonth()) {
            monthDays[userDate.getDate() - 1].count++;
          }
        });

        // Nhóm dữ liệu theo tháng
        const userRegistrationsByMonth = users.reduce((acc, user) => {
          const month = new Date(user.createdAt).toLocaleString("default", {
            month: "short",
          });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        setStats({
          totalUsers,
          usersByGender,
          usersThisWeek: weekDays,
          usersThisMonth: monthDays,
          userRegistrationsByMonth: Object.entries(
            userRegistrationsByMonth
          ).map(([month, count]) => ({ name: month, users: count })),
        });
      }
    }

    fetchData();
  }, []);

  const dataPie = Object.entries(stats.usersByGender).map(([key, value]) => ({
    name: key,
    value,
  }));
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Header />
        <div className="p-6 space-y-6 overflow-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-lg rounded-2xl flex flex-col justify-center items-center bg-white">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Users
              </h2>
              <p className="text-5xl font-bold text-blue-600">
                {stats.totalUsers}
              </p>
            </Card>
            <Card className="p-6 shadow-lg rounded-2xl bg-white flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                User Distribution
              </h2>
              <ResponsiveContainer width="100%" aspect={3}>
                <PieChart>
                  <Pie
                    data={dataPie}
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    innerRadius="40%"
                    dataKey="value"
                    label
                  >
                    {dataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-md rounded-2xl bg-white">
              <h2 className="text-lg font-semibold text-gray-700">
                Users Registered This Week
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.usersThisWeek}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6 shadow-md rounded-2xl bg-white">
              <h2 className="text-lg font-semibold text-gray-700">
                Users Registered This Month
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.usersThisMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Row 3 */}
          <div className="w-full">
            <Card className="p-6 shadow-md rounded-2xl bg-white hover:shadow-xl transition-all">
              <h2 className="text-lg font-semibold text-gray-700">
                User Growth by Month
              </h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.userRegistrationsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#FF69B4"
                      strokeWidth={2.5}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

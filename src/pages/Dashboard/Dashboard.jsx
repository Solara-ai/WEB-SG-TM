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
import { getUserStats } from "../../services/userService";

const COLORS = ["#0088FE", "#FF69B4"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    usersByGender: {},
    usersThisWeek: 0,
    usersThisMonth: 0,
    userRegistrationsByMonth: [],
  });

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  const dataPie = Object.entries(stats.usersByGender).map(([key, value]) => ({
    name: key,
    value,
  }));

  const dataBarWeek = [{ name: "This Week", users: stats.usersThisWeek }];
  const dataBarMonth = [{ name: "This Month", users: stats.usersThisMonth }];

  const dataLineChart = stats.userRegistrationsByMonth.map(
    ({ month, count }) => ({
      name: month,
      users: count,
    })
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Header />

        <div className="p-6 space-y-6 overflow-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Users */}
            <Card className="p-6 shadow-lg rounded-2xl flex flex-col justify-center items-center bg-white hover:shadow-xl transition-all">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Users
              </h2>
              <p className="text-5xl font-bold text-blue-600">
                {stats.totalUsers}
              </p>
            </Card>

            {/* Card Biểu đồ Pie */}
            <Card className="p-6 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                User Distribution
              </h2>
              <div className="w-3/4">
                <ResponsiveContainer width="100%" aspect={1.5}>
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
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend dưới biểu đồ */}
              <div className="mt-2">
                <Legend layout="horizontal" align="center" />
              </div>
            </Card>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-md rounded-2xl bg-white hover:shadow-xl transition-all">
              <h2 className="text-lg font-semibold text-gray-700">
                Users Registered This Week
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dataBarWeek}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#4F46E5" barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 shadow-md rounded-2xl bg-white hover:shadow-xl transition-all">
              <h2 className="text-lg font-semibold text-gray-700">
                Users Registered This Month
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dataBarMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#10B981" barSize={45} />
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
                  <LineChart data={dataLineChart}>
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

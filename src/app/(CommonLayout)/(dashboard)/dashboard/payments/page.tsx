// pages/admin/payments.tsx
"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

import { gettingAllUsers } from "@/src/services/getUser";
import { IUser } from "@/src/types";

const PaymentHistory = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [totalCompletedPayments, setTotalCompletedPayments] =
    useState<number>(0);

  // Colors for Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await gettingAllUsers();

      setUsers(data?.data || []);

      // Extract payment data for the graph (completed payments directly from the completePayment field)
      const paymentInfo = data?.data.map((user: IUser) => ({
        name: user.name || "Unknown User",
        completedPayments: user.completePayment || 0, // Directly use completePayment field
      }));

      setPaymentData(paymentInfo);

      // Calculate total completed payments
      const totalPayments = paymentInfo.reduce(
        (sum: any, user: { completedPayments: any }) =>
          sum + user.completedPayments,
        0,
      );

      setTotalCompletedPayments(totalPayments);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>

      {/* Table for Payment History */}
      <div className="bg-white p-4 shadow rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">User Payment History</h2>
        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Completed Payments</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border">{user.name || "Unknown"}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  {user.completePayment || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Completed Payments Bar Chart */}
      <div className="bg-white p-4 shadow rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Completed Payments Overview
        </h2>
        <BarChart data={paymentData} height={300} width={600}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completedPayments" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Pie Chart for Completed Payments */}
      <div className="bg-white p-4 shadow rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Completed Payments Breakdown
        </h2>
        <PieChart height={300} width={400}>
          <Pie
            label
            cx="50%"
            cy="50%"
            data={paymentData}
            dataKey="completedPayments"
            fill="#8884d8"
            nameKey="name"
            outerRadius={100}
          >
            {paymentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Line Chart for Payment Trends */}
      <div className="bg-white p-4 shadow rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Trend Over Users</h2>
        <LineChart
          data={paymentData}
          height={300}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          width={600}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="completedPayments" stroke="#8884d8" type="monotone" />
        </LineChart>
      </div>

      {/* Area Chart for Total Payments */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Total Payments Overview</h2>
        <AreaChart
          data={paymentData}
          height={300}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          width={600}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            dataKey="completedPayments"
            fill="#82ca9d"
            stroke="#82ca9d"
            type="monotone"
          />
        </AreaChart>
      </div>
    </>
  );
};

export default PaymentHistory;

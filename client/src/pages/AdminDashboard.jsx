import { useEffect, useState } from "react";

import AdminNavbar from "../components/navbar/AdminNavbar";

import API from "../services/api";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

import { motion } from "framer-motion";

const AdminDashboard = () => {

  const [stats, setStats] =
    useState(null);

  const fetchStats = async () => {
    try {

      const response = await API.get(
        "/orders/dashboard/stats"
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <>
        <AdminNavbar />

        <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center">

          <h1 className="text-4xl font-bold text-green-700">
            Loading Dashboard...
          </h1>

        </div>
      </>
    );
  }

  const dashboardCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },

    {
      title: "Revenue",
      value: `₹ ${stats.totalRevenue}`,
      icon: <FaDollarSign />,
      color: "text-green-700",
      bg: "bg-green-100",
    },

    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },

    {
      title: "Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-16">

            <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
              FreshIndia Admin
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Dashboard Overview
            </h1>

            <p className="text-gray-600 mt-4">
              Monitor orders, products, revenue and customer activity.
            </p>

          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">

            {dashboardCards.map((card, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="bg-white rounded-3xl border border-green-100 shadow-sm p-8 hover:shadow-xl transition"
              >

                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 ${card.bg} ${card.color}`}
                >
                  {card.icon}
                </div>

                <h2 className="text-gray-500 text-lg">
                  {card.title}
                </h2>

                <p className="text-5xl font-bold text-gray-900 mt-4">
                  {card.value}
                </p>

              </motion.div>

            ))}

          </div>

          {/* QUICK OVERVIEW */}

          <div className="grid md:grid-cols-3 gap-10">

            {/* ORDERS */}

            <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-10 hover:shadow-lg transition">

              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
                📦
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Orders
              </h2>

              <p className="text-gray-600 leading-8">
                Manage export orders,
                customer shipments and
                delivery tracking.
              </p>

            </div>

            {/* PRODUCTS */}

            <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-10 hover:shadow-lg transition">

              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center text-3xl mb-6">
                🥭
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Products
              </h2>

              <p className="text-gray-600 leading-8">
                Control inventory,
                pricing, stock updates
                and product catalogue.
              </p>

            </div>

            {/* ANALYTICS */}

            <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-10 hover:shadow-lg transition">

              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                📈
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Analytics
              </h2>

              <p className="text-gray-600 leading-8">
                Track revenue,
                growth trends and
                business performance.
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default AdminDashboard;
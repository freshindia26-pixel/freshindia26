
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
  const [stats, setStats] = useState(null);

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

        <div className="min-h-screen bg-black text-white flex items-center justify-center text-4xl">
          Loading Dashboard...
        </div>
      </>
    );
  }

  const dashboardCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
    },

    {
      title: "Revenue",
      value: `$${stats.totalRevenue}`,
      icon: <FaDollarSign />,
    },

    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
    },

    {
      title: "Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
    },
  ];

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-16">

            <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
              FreshIndia Admin
            </p>

            <h1 className="text-6xl font-bold">
              Dashboard Overview
            </h1>

          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-4 gap-8 mb-20">

            {dashboardCards.map((card, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-yellow-500/20 rounded-3xl p-8 backdrop-blur-xl hover:border-yellow-400 transition"
              >

                <div className="text-5xl text-yellow-400 mb-6">
                  {card.icon}
                </div>

                <h2 className="text-gray-400 text-lg">
                  {card.title}
                </h2>

                <p className="text-5xl font-bold mt-4">
                  {card.value}
                </p>

              </motion.div>

            ))}

          </div>

          {/* QUICK OVERVIEW */}

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

              <h2 className="text-3xl font-bold mb-6">
                Orders
              </h2>

              <p className="text-gray-400 leading-8">
                Manage export orders
                and customer shipments.
              </p>

            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

              <h2 className="text-3xl font-bold mb-6">
                Products
              </h2>

              <p className="text-gray-400 leading-8">
                Control fruit inventory,
                pricing and stock.
              </p>

            </div>

            <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

              <h2 className="text-3xl font-bold mb-6">
                Analytics
              </h2>

              <p className="text-gray-400 leading-8">
                Track growth and
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

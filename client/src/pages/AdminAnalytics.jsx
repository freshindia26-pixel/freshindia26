
import { useEffect, useState } from "react";

import AdminNavbar from "../components/navbar/AdminNavbar";

import API from "../services/api";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { motion } from "framer-motion";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);

  const fetchAnalytics = async () => {
    try {

      const response = await API.get(
        "/orders/analytics/full"
      );

      setData(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) {
    return (
      <>
        <AdminNavbar />

        <div className="min-h-screen bg-black text-white flex items-center justify-center text-4xl">
          Loading Analytics...
        </div>
      </>
    );
  }

  // BAR DATA

  const overviewData = [
    {
      name: "Orders",
      value: Number(data.totalOrders),
    },

    {
      name: "Products",
      value: Number(data.totalProducts),
    },

    {
      name: "Users",
      value: Number(data.totalUsers),
    },
  ];

  // PIE DATA

  const pieData = data.topProducts.map(
    (item) => ({
      name: item.product_name,
      value: Number(item.total_orders),
    })
  );

  const COLORS = [
    "#FFD700",
    "#22C55E",
    "#3B82F6",
    "#EF4444",
    "#A855F7",
  ];

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-16">

            <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
              Business Intelligence
            </p>

            <h1 className="text-6xl font-bold">
              Analytics Overview
            </h1>

          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-4 gap-8 mb-20">

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-yellow-500/20 rounded-3xl p-8"
            >

              <h2 className="text-gray-400">
                Revenue
              </h2>

              <p className="text-5xl font-bold text-yellow-400 mt-4">
                ${data.totalRevenue}
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-yellow-500/20 rounded-3xl p-8"
            >

              <h2 className="text-gray-400">
                Orders
              </h2>

              <p className="text-5xl font-bold mt-4">
                {data.totalOrders}
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-yellow-500/20 rounded-3xl p-8"
            >

              <h2 className="text-gray-400">
                Products
              </h2>

              <p className="text-5xl font-bold mt-4">
                {data.totalProducts}
              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-yellow-500/20 rounded-3xl p-8"
            >

              <h2 className="text-gray-400">
                Users
              </h2>

              <p className="text-5xl font-bold mt-4">
                {data.totalUsers}
              </p>

            </motion.div>

          </div>

          {/* CHARTS */}

          <div className="grid md:grid-cols-2 gap-10 mb-20">

            {/* BAR CHART */}

            <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

              <h2 className="text-3xl font-bold mb-10">
                Platform Overview
              </h2>

              <div className="h-[400px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={overviewData}
                  >

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="value" />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* PIE CHART */}

            <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

              <h2 className="text-3xl font-bold mb-10">
                Top Selling Products
              </h2>

              <div className="h-[400px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={pieData}
                      dataKey="value"
                      outerRadius={140}
                      label
                    >

                      {pieData.map(
                        (entry, index) => (

                          <Cell
                            key={index}
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

          {/* TOP PRODUCTS */}

          <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-10">
              Top Products
            </h2>

            <div className="space-y-6">

              {data.topProducts.map(
                (product, index) => (

                  <div
                    key={index}
                    className="border border-yellow-500/10 rounded-2xl p-6 flex items-center justify-between"
                  >

                    <h3 className="text-2xl font-bold">
                      {product.product_name}
                    </h3>

                    <p className="text-yellow-400 text-2xl font-bold">
                      {product.total_orders} Orders
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default AdminAnalytics;

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

  const [data, setData] =
    useState(null);

  const fetchAnalytics = async () => {
    try {

      const response =
        await API.get(
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

        <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center">

          <h1 className="text-4xl font-bold text-green-700">
            Loading Analytics...
          </h1>

        </div>
      </>
    );
  }

  /* BAR DATA */

  const overviewData = [
    {
      name: "Orders",
      value: Number(
        data.totalOrders
      ),
    },

    {
      name: "Products",
      value: Number(
        data.totalProducts
      ),
    },

    {
      name: "Users",
      value: Number(
        data.totalUsers
      ),
    },
  ];

  /* PIE DATA */

  const pieData =
    data.topProducts.map(
      (item) => ({
        name:
          item.product_name,

        value: Number(
          item.total_orders
        ),
      })
    );

  const COLORS = [
    "#15803d",
    "#f97316",
    "#2563eb",
    "#9333ea",
    "#dc2626",
  ];

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-16">

            <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
              Business Intelligence
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Analytics Overview
            </h1>

            <p className="text-gray-600 mt-4">
              Monitor revenue, orders, products and business growth.
            </p>

          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">

            {/* REVENUE */}

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="bg-white border border-green-100 rounded-3xl shadow-sm p-8"
            >

              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
                💰
              </div>

              <h2 className="text-gray-500">
                Revenue
              </h2>

              <p className="text-5xl font-bold text-orange-500 mt-4">
                ₹ {data.totalRevenue}
              </p>

            </motion.div>

            {/* ORDERS */}

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="bg-white border border-green-100 rounded-3xl shadow-sm p-8"
            >

              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center text-3xl mb-6">
                📦
              </div>

              <h2 className="text-gray-500">
                Orders
              </h2>

              <p className="text-5xl font-bold text-gray-900 mt-4">
                {data.totalOrders}
              </p>

            </motion.div>

            {/* PRODUCTS */}

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="bg-white border border-green-100 rounded-3xl shadow-sm p-8"
            >

              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                🥭
              </div>

              <h2 className="text-gray-500">
                Products
              </h2>

              <p className="text-5xl font-bold text-gray-900 mt-4">
                {data.totalProducts}
              </p>

            </motion.div>

            {/* USERS */}

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="bg-white border border-green-100 rounded-3xl shadow-sm p-8"
            >

              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                👥
              </div>

              <h2 className="text-gray-500">
                Users
              </h2>

              <p className="text-5xl font-bold text-gray-900 mt-4">
                {data.totalUsers}
              </p>

            </motion.div>

          </div>

          {/* CHARTS */}

          <div className="grid lg:grid-cols-2 gap-10 mb-20">

            {/* BAR CHART */}

            <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-10">

              <h2 className="text-3xl font-bold text-gray-900 mb-10">
                Platform Overview
              </h2>

              <div className="h-[400px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={
                      overviewData
                    }
                  >

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#15803d"
                      radius={[
                        10,
                        10,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* PIE CHART */}

            <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-10">

              <h2 className="text-3xl font-bold text-gray-900 mb-10">
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
                        (
                          entry,
                          index
                        ) => (

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

          <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-10">

            <h2 className="text-4xl font-bold text-gray-900 mb-10">
              Top Products
            </h2>

            <div className="space-y-6">

              {data.topProducts.map(
                (
                  product,
                  index
                ) => (

                  <div
                    key={index}
                    className="border border-green-100 rounded-2xl p-6 flex items-center justify-between hover:bg-green-50 transition"
                  >

                    <h3 className="text-2xl font-bold text-gray-900">
                      {
                        product.product_name
                      }
                    </h3>

                    <p className="text-green-700 text-2xl font-bold">
                      {
                        product.total_orders
                      } Orders
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
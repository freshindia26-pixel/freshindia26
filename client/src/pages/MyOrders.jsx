
import { useEffect, useState } from "react";

import Navbar from "../components/navbar/Navbar";

import API from "../services/api";

import { motion } from "framer-motion";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchOrders = async () => {
    try {

      const response = await API.get(
        `/orders/user/${user.id}`
      );

      setOrders(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-16">

            <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
              Customer Orders
            </p>

            <h1 className="text-6xl font-bold">
              My Orders
            </h1>

          </div>

          {/* EMPTY */}

          {orders.length === 0 && (

            <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-20 text-center">

              <h2 className="text-4xl font-bold mb-6">
                No Orders Yet
              </h2>

              <p className="text-gray-400">
                Your export orders will appear here.
              </p>

            </div>

          )}

          {/* ORDERS */}

          <div className="space-y-8">

            {orders.map((order, index) => (

              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-yellow-500/20 rounded-3xl p-8"
              >

                <div className="grid md:grid-cols-3 gap-10">

                  {/* LEFT */}

                  <div>

                    <h2 className="text-3xl font-bold mb-4">
                      {order.product_name}
                    </h2>

                    <p className="text-gray-400">
                      Quantity
                    </p>

                    <p className="text-2xl mt-2">
                      {order.quantity}
                    </p>

                    <p className="text-gray-400 mt-6">
                      Total Price
                    </p>

                    <p className="text-3xl text-yellow-400 font-bold mt-2">
                      ${order.total_price}
                    </p>

                  </div>

                  {/* CENTER */}

                  <div>

                    <p className="text-gray-400">
                      Shipping Address
                    </p>

                    <p className="mt-2 leading-8">
                      {order.shipping_address}
                    </p>

                    <p className="text-gray-400 mt-8">
                      Tracking ID
                    </p>

                    <p className="text-yellow-400 text-2xl font-bold mt-2">
                      {order.tracking_id ||
                        "Not Assigned Yet"}
                    </p>

                  </div>

                  {/* RIGHT */}

                  <div>

                    <p className="text-gray-400 mb-4">
                      Order Status
                    </p>

                    <span
                      className={`
                        px-5 py-2 rounded-full text-sm font-semibold

                        ${
                          order.status === "Pending"
                            ? "bg-yellow-500 text-black"

                            : order.status === "Processing"
                            ? "bg-blue-500"

                            : order.status === "Dispatched"
                            ? "bg-purple-500"

                            : order.status === "Delivered"
                            ? "bg-green-500"

                            : "bg-gray-500"
                        }
                      `}
                    >
                      {order.status}
                    </span>

                    {/* TRACKING TIMELINE */}

                    <div className="mt-10 space-y-6">

                      <div className="flex items-center gap-4">

                        <div className="w-4 h-4 rounded-full bg-yellow-400" />

                        <p>
                          Order Placed
                        </p>

                      </div>

                      <div className="flex items-center gap-4">

                        <div
                          className={`
                            w-4 h-4 rounded-full

                            ${
                              order.status ===
                                "Processing" ||
                              order.status ===
                                "Dispatched" ||
                              order.status ===
                                "Delivered"
                                ? "bg-yellow-400"

                                : "bg-gray-500"
                            }
                          `}
                        />

                        <p>
                          Processing
                        </p>

                      </div>

                      <div className="flex items-center gap-4">

                        <div
                          className={`
                            w-4 h-4 rounded-full

                            ${
                              order.status ===
                                "Dispatched" ||
                              order.status ===
                                "Delivered"
                                ? "bg-yellow-400"

                                : "bg-gray-500"
                            }
                          `}
                        />

                        <p>
                          Dispatched
                        </p>

                      </div>

                      <div className="flex items-center gap-4">

                        <div
                          className={`
                            w-4 h-4 rounded-full

                            ${
                              order.status ===
                              "Delivered"
                                ? "bg-yellow-400"

                                : "bg-gray-500"
                            }
                          `}
                        />

                        <p>
                          Delivered
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>
    </>
  );
};

export default MyOrders;

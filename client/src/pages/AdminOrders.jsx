import { useEffect, useState } from "react";

import AdminNavbar from "../components/navbar/AdminNavbar";

import API from "../services/api";

import { motion } from "framer-motion";

const AdminOrders = () => {

  const [orders, setOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  /* FETCH ORDERS */

  const fetchOrders = async () => {
    try {

      const response = await API.get(
        "/orders"
      );

      setOrders(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* UPDATE ORDER */

  const updateOrder = async (
    id,
    status,
    tracking_id
  ) => {
    try {

      await API.put(
        `/orders/${id}`,
        {
          status,
          tracking_id,
        }
      );

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  /* FILTERS */

  const filteredOrders =
    orders.filter((order) => {

      const matchesSearch =

        order.customer_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        order.product_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =

        statusFilter === "All"

        ||

        order.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-16">

            <span className="inline-block bg-orange-100 text-orange-500 px-5 py-2 rounded-full font-medium mb-5">
              Order Management
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Customer Orders
            </h1>

            <p className="text-gray-600 mt-4">
              Manage orders, shipment tracking and delivery updates.
            </p>

          </div>

          {/* FILTERS */}

          <div className="flex flex-col md:flex-row gap-6 mb-12">

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 bg-white border border-green-100 rounded-2xl px-6 py-4 outline-none focus:border-green-600 shadow-sm"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="bg-white border border-green-100 rounded-2xl px-6 py-4 outline-none focus:border-green-600 shadow-sm"
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Dispatched">
                Dispatched
              </option>

              <option value="Delivered">
                Delivered
              </option>

            </select>

          </div>

          {/* ORDERS */}

          <div className="space-y-8">

            {filteredOrders.map(
              (order, index) => (

                <motion.div
                  key={order.id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  className="bg-white border border-green-100 rounded-3xl shadow-sm p-8 hover:shadow-lg transition"
                >

                  <div className="grid lg:grid-cols-3 gap-10">

                    {/* LEFT */}

                    <div>

                      <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
                        Order #{order.id}
                      </span>

                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {order.product_name}
                      </h2>

                      <p className="text-gray-500">
                        Customer Name
                      </p>

                      <p className="text-xl mt-2 font-medium text-gray-900">
                        {order.customer_name}
                      </p>

                      <p className="text-gray-500 mt-6">
                        Email
                      </p>

                      <p className="mt-2 text-gray-700">
                        {order.customer_email}
                      </p>

                    </div>

                    {/* CENTER */}

                    <div>

                      <p className="text-gray-500">
                        Quantity
                      </p>

                      <p className="text-2xl mt-2 font-bold text-gray-900">
                        {order.quantity}
                      </p>

                      <p className="text-gray-500 mt-6">
                        Total Price
                      </p>

                      <p className="text-4xl text-orange-500 font-bold mt-2">
                        ₹ {order.total_price}
                      </p>

                      <p className="text-gray-500 mt-6">
                        Shipping Address
                      </p>

                      <p className="mt-2 text-gray-700 leading-7">
                        {order.shipping_address}
                      </p>

                    </div>

                    {/* RIGHT */}

                    <div>

                      <p className="text-gray-500 mb-4">
                        Order Status
                      </p>

                      <span
                        className={`
                          px-5 py-2 rounded-full text-sm font-semibold

                          ${
                            order.status ===
                            "Pending"

                              ? "bg-orange-100 text-orange-600"

                              : order.status ===
                                "Processing"

                              ? "bg-blue-100 text-blue-600"

                              : order.status ===
                                "Dispatched"

                              ? "bg-purple-100 text-purple-600"

                              : order.status ===
                                "Delivered"

                              ? "bg-green-100 text-green-700"

                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {order.status}
                      </span>

                      {/* UPDATE */}

                      <div className="mt-10 space-y-5">

                        <select
                          onChange={(e) =>
                            updateOrder(
                              order.id,
                              e.target.value,
                              order.tracking_id
                            )
                          }
                          className="w-full bg-white border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
                        >

                          <option>
                            Update Status
                          </option>

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Dispatched">
                            Dispatched
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                        </select>

                        <input
                          type="text"
                          placeholder="Tracking ID"
                          defaultValue={
                            order.tracking_id
                          }
                          onBlur={(e) =>
                            updateOrder(
                              order.id,
                              order.status,
                              e.target.value
                            )
                          }
                          className="w-full bg-white border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
                        />

                      </div>

                    </div>

                  </div>

                </motion.div>

              )
            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default AdminOrders;
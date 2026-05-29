import { useEffect, useState } from "react";

import AdminNavbar from "../components/navbar/AdminNavbar";

import API from "../services/api";

import { motion } from "framer-motion";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  // FETCH ORDERS

  const fetchOrders = async () => {
    try {

      const response = await API.get("/orders");

      setOrders(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // UPDATE STATUS

  const updateOrder = async (
    id,
    status,
    tracking_id
  ) => {
    try {

      await API.put(`/orders/${id}`, {
        status,
        tracking_id,
      });

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  // FILTERS

  const filteredOrders = orders.filter(
    (order) => {

      const matchesSearch =
        order.customer_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        order.product_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-16">

            <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
              Order Management
            </p>

            <h1 className="text-6xl font-bold">
              Customer Orders
            </h1>

          </div>

          {/* FILTERS */}

          <div className="flex flex-col md:flex-row gap-6 mb-12">

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 bg-white/5 border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="bg-white/5 border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none"
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

            {filteredOrders.map((order, index) => (

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
                      Customer:
                    </p>

                    <p className="text-xl mt-2">
                      {order.customer_name}
                    </p>

                    <p className="text-gray-400 mt-6">
                      Email:
                    </p>

                    <p className="mt-2">
                      {order.customer_email}
                    </p>

                  </div>

                  {/* CENTER */}

                  <div>

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

                    <p className="text-gray-400 mt-6">
                      Address
                    </p>

                    <p className="mt-2">
                      {order.shipping_address}
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

                            : order.status === "Dispatched"
                            ? "bg-blue-500"

                            : order.status === "Delivered"
                            ? "bg-green-500"

                            : "bg-gray-500"
                        }
                      `}
                    >
                      {order.status}
                    </span>

                    {/* UPDATE */}

                    <div className="mt-10 space-y-4">

                      <select
                        onChange={(e) =>
                          updateOrder(
                            order.id,
                            e.target.value,
                            order.tracking_id
                          )
                        }
                        className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
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
                        className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
                      />

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

export default AdminOrders;

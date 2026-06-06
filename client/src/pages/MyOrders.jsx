import { useEffect, useState } from "react";
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
    <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">

          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
            Order Management
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="text-gray-600 mt-4">
            Track all your FreshIndia orders in one place.
          </p>

        </div>

        {/* EMPTY */}

        {orders.length === 0 && (

          <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-16 text-center">

            <h2 className="text-3xl font-bold text-gray-800">
              No Orders Yet
            </h2>

            <p className="text-gray-600 mt-4">
              Your orders will appear here once placed.
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
              className="bg-white border border-green-100 rounded-3xl shadow-sm p-8"
            >

              <div className="grid lg:grid-cols-3 gap-10">

                {/* PRODUCT INFO */}

                <div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {order.product_name}
                  </h2>

                  <p className="text-gray-500">
                    Quantity
                  </p>

                  <p className="text-xl font-semibold mt-2">
                    {order.quantity}
                  </p>

                  <p className="text-gray-500 mt-6">
                    Total Amount
                  </p>

                  <p className="text-3xl text-orange-500 font-bold mt-2">
                    ₹ {order.total_price}
                  </p>

                </div>

                {/* SHIPPING */}

                <div>

                  <p className="text-gray-500">
                    Shipping Address
                  </p>

                  <p className="mt-3 text-gray-700 leading-7">
                    {order.shipping_address}
                  </p>

                  <p className="text-gray-500 mt-8">
                    Tracking ID
                  </p>

                  <p className="text-green-700 font-bold text-xl mt-2">
                    {order.tracking_id ||
                      "Not Assigned Yet"}
                  </p>

                </div>

                {/* STATUS */}

                <div>

                  <p className="text-gray-500 mb-4">
                    Order Status
                  </p>

                  <span
                    className={`
                      px-5 py-2 rounded-full text-sm font-semibold

                      ${
                        order.status === "Pending"
                          ? "bg-orange-100 text-orange-600"

                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-600"

                          : order.status === "Dispatched"
                          ? "bg-purple-100 text-purple-600"

                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"

                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {order.status}
                  </span>

                  {/* TIMELINE */}

                  <div className="mt-10 space-y-5">

                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-green-600" />
                      <p>Order Placed</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          order.status === "Processing" ||
                          order.status === "Dispatched" ||
                          order.status === "Delivered"
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />
                      <p>Processing</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          order.status === "Dispatched" ||
                          order.status === "Delivered"
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />
                      <p>Dispatched</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />
                      <p>Delivered</p>
                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MyOrders;
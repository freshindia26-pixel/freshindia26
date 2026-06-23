
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) =>
      acc +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
            FreshIndia Cart
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Shopping Cart
          </h1>

        </div>

        {cartItems.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-16 text-center">

            <h2 className="text-3xl font-bold text-gray-800">
              Your Cart Is Empty
            </h2>

          </div>

        ) : (

          <>
            <div className="space-y-6">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-sm border border-green-100 p-6 flex flex-col md:flex-row justify-between items-center gap-6"
                >

                  <div className="flex items-center gap-6">

                    <img
                      src={
                        item.image_url ||
                        item.image ||
                        "https://via.placeholder.com/150"
                      }
                      alt={item.name}
                      className="w-28 h-28 rounded-2xl object-cover"
                    />

                    <div>

                      <h2 className="text-2xl font-bold text-gray-900">
                        {item.name}
                      </h2>

                      <p className="text-gray-500">
                        {item.category}
                      </p>

                      <p className="text-green-700 font-semibold mt-2">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-3xl font-bold text-orange-500">
                      ₹ {Number(item.price) * Number(item.quantity)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-12 bg-white rounded-3xl shadow-sm border border-green-100 p-8">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between items-center">

                <span className="text-xl">
                  Total Amount
                </span>

                <span className="text-4xl font-bold text-green-700">
                  ₹ {total}
                </span>

              </div>

              <div className="flex gap-4 mt-8">

                <button className="bg-green-700 text-white px-8 py-4 rounded-full">
                  Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-8 py-4 rounded-full"
                >
                  Clear Cart
                </button>

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
};

export default Cart;

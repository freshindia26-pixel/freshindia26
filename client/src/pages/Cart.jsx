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
      acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">

          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
            FreshIndia Cart
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Shopping Cart
          </h1>

          <p className="text-gray-600">
            Review your selected products before checkout.
          </p>

        </div>

        {/* EMPTY CART */}

        {cartItems.length === 0 ? (

          <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-16 text-center">

            <h2 className="text-3xl font-bold text-gray-800">
              Your Cart Is Empty
            </h2>

            <p className="text-gray-600 mt-4">
              Add products to continue shopping.
            </p>

          </div>

        ) : (

          <>
            {/* ITEMS */}

            <div className="space-y-8">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-sm border border-green-100 p-6 flex flex-col lg:flex-row items-center justify-between gap-6"
                >

                  <div className="flex items-center gap-6">

                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-2xl"
                    />

                    <div>

                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-3">
                        {item.category}
                      </span>

                      <h2 className="text-2xl font-bold text-gray-900">
                        {item.name}
                      </h2>

                      <p className="text-gray-600 mt-2">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                  </div>

                  <div className="text-center lg:text-right">

                    <p className="text-3xl font-bold text-orange-500">
                      ₹ {item.price * item.quantity}
                    </p>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* ORDER SUMMARY */}

            <div className="mt-16 bg-white rounded-3xl shadow-sm border border-green-100 p-10">

              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Order Summary
              </h2>

              <div className="flex justify-between items-center mb-8">

                <span className="text-xl text-gray-700">
                  Total Amount
                </span>

                <span className="text-4xl font-bold text-green-700">
                  ₹ {total}
                </span>

              </div>

              <div className="flex flex-wrap gap-5">

                <button
                  className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold transition"
                >
                  Proceed To Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition"
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
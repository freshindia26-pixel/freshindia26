
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
    <div className="min-h-screen bg-black text-white pt-40 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold text-yellow-400 mb-16">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (

          <p className="text-gray-400 text-xl">
            Cart is empty
          </p>

        ) : (

          <>
            <div className="space-y-8">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="bg-white/5 border border-yellow-500/20 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between"
                >

                  <div className="flex items-center gap-6">

                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-2xl"
                    />

                    <div>

                      <h2 className="text-3xl font-bold">
                        {item.name}
                      </h2>

                      <p className="text-gray-400 mt-2">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                  </div>

                  <div>

                    <p className="text-yellow-400 text-3xl font-bold">
                      $
                      {item.price * item.quantity}
                    </p>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="mt-4 bg-red-500 px-5 py-2 rounded-full"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* TOTAL */}

            <div className="mt-16 bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

              <h2 className="text-4xl font-bold">
                Total: ${total}
              </h2>

              <button className="mt-8 bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
                Checkout
              </button>

              <button
                onClick={clearCart}
                className="ml-6 bg-red-500 text-white px-8 py-4 rounded-full font-semibold"
              >
                Clear Cart
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default Cart;

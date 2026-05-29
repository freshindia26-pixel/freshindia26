
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [shippingAddress, setShippingAddress] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // FETCH PRODUCT

  const fetchProduct = async () => {
    try {

      const response = await API.get("/products");

      const foundProduct = response.data.find(
        (item) => item.id === Number(id)
      );

      setProduct(foundProduct);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // TOTAL PRICE

  const totalPrice =
    Number(product.price) * quantity;

<button
  onClick={() => addToCart(product)}
  className="mt-10 mr-6 bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
>
  Add To Cart
</button>

  // PLACE ORDER

  const placeOrder = async () => {
    try {

      if (!user) {
        alert("Please login first");
        return;
      }

      const orderData = {
        user_id: user.id,
        customer_name: user.name,
        customer_email: user.email,
        product_name: product.name,
        quantity,
        total_price: totalPrice,
        shipping_address: shippingAddress,
      };

      await API.post("/orders", orderData);

      alert("Order Placed Successfully");

      setShippingAddress("");
      setQuantity(1);

    } catch (error) {

      console.log(error);

      alert("Order Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}

        <img
          src={product.image_url}
          alt={product.name}
          className="rounded-3xl border border-yellow-500/20"
        />

        {/* DETAILS */}

        <div>

          <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
            {product.category}
          </p>

          <h1 className="text-6xl font-bold mb-8">
            {product.name}
          </h1>

          <p className="text-gray-300 leading-8 text-lg">
            {product.description}
          </p>

          <p className="text-yellow-400 text-4xl font-bold mt-10">
            ${totalPrice}
          </p>

          {/* QUANTITY */}

          <div className="mt-10">

            <label className="block mb-3 text-gray-300">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className="w-40 bg-black border border-yellow-500/20 rounded-xl px-5 py-4 text-white outline-none"
            />

          </div>

          {/* SHIPPING ADDRESS */}

          <div className="mt-8">

            <label className="block mb-3 text-gray-300">
              Shipping Address
            </label>

            <textarea
              rows="4"
              value={shippingAddress}
              onChange={(e) =>
                setShippingAddress(e.target.value)
              }
              className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4 text-white outline-none"
              placeholder="Enter shipping address"
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={placeOrder}
            className="mt-10 bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;

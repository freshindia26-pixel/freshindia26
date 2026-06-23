
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart, cartItems } =
    useContext(CartContext);

  const [product, setProduct] =
    useState(null);

  const cartItem = cartItems.find(
    (item) => item.id === product?.id
  );

  const quantityInCart = cartItem
    ? cartItem.quantity
    : 0;

  const fetchProduct = async () => {
    try {
      const response = await API.get("/products");

      const foundProduct =
        response.data.find(
          (item) =>
            item.id === Number(id)
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
      <div className="min-h-screen flex items-center justify-center bg-[#f8faf8]">
        <h2 className="text-2xl font-semibold text-green-700">
          Loading Product...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* PRODUCT IMAGE */}

          <div>

            <img
              src={product.image_url}
              alt={product.name}
              className="w-full rounded-3xl shadow-xl border border-green-100"
            />

          </div>

          {/* PRODUCT INFO */}

          <div>

            <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-6">
              {product.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {product.name}
            </h1>

            <p className="text-gray-600 text-lg leading-8">
              {product.description}
            </p>

            <div className="mt-10">

              <p className="text-orange-500 text-4xl font-bold">
                ₹ {product.price}
              </p>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-5 mt-10">

              <button
                onClick={() =>
                  addToCart(product)
                }
                className="relative bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold transition"
              >
                Add To Cart

                {quantityInCart > 0 && (
                  <span className="absolute -top-3 -right-3 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {quantityInCart}
                  </span>
                )}
              </button>

              <a
                href="/bulk-enquiry"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold transition"
              >
                Bulk Enquiry
              </a>

            </div>

            {/* EXPORT INFO */}

            <div className="mt-14 bg-white rounded-3xl shadow-sm border border-green-100 p-8">

              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Export Information
              </h3>

              <ul className="space-y-3 text-gray-600">

                <li>
                  ✅ Export Quality Product
                </li>

                <li>
                  ✅ International Packaging Standards
                </li>

                <li>
                  ✅ Bulk Quantity Available
                </li>

                <li>
                  ✅ Global Shipping Support
                </li>

                <li>
                  ✅ FreshIndia Quality Assurance
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;
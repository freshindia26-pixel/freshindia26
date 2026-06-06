import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-green-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-500">

      <div className="overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="h-[320px] w-full object-cover group-hover:scale-105 transition duration-700"
        />

      </div>

      <div className="p-6">

        <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
          {product.category}
        </span>

        <h3 className="text-2xl font-bold text-gray-900">
          {product.name}
        </h3>

        <p className="text-orange-500 font-semibold text-lg mt-3">
          ₹ {product.price}
        </p>

        <Link to={`/products/${product.id}`}>
          <button className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition">
            View Details
          </button>
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;
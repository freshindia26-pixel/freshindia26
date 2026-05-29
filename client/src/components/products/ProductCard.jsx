
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-white/5 backdrop-blur-md hover:-translate-y-3 transition duration-500">

      <img
        src={product.image}
        alt={product.name}
        className="h-[400px] w-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

      <div className="absolute bottom-0 p-8">

        <p className="text-yellow-400 mb-2">
          {product.category}
        </p>

        <h3 className="text-3xl font-bold text-white">
          {product.name}
        </h3>

        <p className="text-gray-300 mt-3">
          {product.price}
        </p>

        <Link to={`/products/${product.id}`}>
          <button className="mt-6 border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full hover:bg-yellow-500 hover:text-black transition">
            View Details
          </button>
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;


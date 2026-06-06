import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/products/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const matchesSearch = product.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

        const matchesCategory =
          category === "All" ||
          product.category === category;

        return matchesSearch && matchesCategory;
      })
    : [];

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">

          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
            FreshIndia Product Collection
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Products
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore our premium range of export-quality fruits,
            vegetables and agricultural products sourced from
            trusted growers and suppliers.
          </p>

        </div>

        {/* SEARCH + FILTER */}

        <div className="grid md:grid-cols-2 gap-6 mb-16">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border border-green-200 rounded-2xl px-6 py-4 text-gray-800 outline-none focus:border-green-600 shadow-sm"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white border border-green-200 rounded-2xl px-6 py-4 text-gray-800 outline-none focus:border-green-600 shadow-sm"
          >
            <option value="All">
              All Categories
            </option>

            <option value="Mangoes">
              Mangoes
            </option>

            <option value="Exotic Fruits">
              Exotic Fruits
            </option>

            <option value="Fresh Produce">
              Fresh Produce
            </option>

          </select>

        </div>

        {/* PRODUCTS */}

        {filteredProducts.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-12 text-center">

            <h3 className="text-2xl font-semibold text-gray-800">
              No Products Found
            </h3>

            <p className="text-gray-600 mt-4">
              Try changing your search or category filter.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  image: product.image_url,
                }}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default ProductsPage;
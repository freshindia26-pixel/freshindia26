
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

      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-16">

          <h1 className="text-6xl font-bold text-yellow-400 mb-6">
            Our Products
          </h1>

          <p className="text-gray-400 text-lg">
            Premium export-quality fruits from India.
          </p>

        </div>

        {/* SEARCH + FILTER */}

        <div className="flex flex-col md:flex-row gap-6 mb-16">

          <input
            type="text"
            placeholder="Search fruits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/5 border border-yellow-500/20 rounded-2xl px-6 py-4 text-white outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white/5 border border-yellow-500/20 rounded-2xl px-6 py-4 text-white outline-none"
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

        <div className="grid md:grid-cols-3 gap-10">

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

      </div>

    </div>
  );
};

export default ProductsPage;

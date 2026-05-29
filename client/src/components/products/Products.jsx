
import { useEffect, useState } from "react";

import API from "../../services/api";

import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <section className="bg-black py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
            Our Products
          </p>

          <h2 className="text-5xl font-bold text-white">
            Premium Export Fruits
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {products.map((product) => (
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

    </section>
  );
};

export default Products;

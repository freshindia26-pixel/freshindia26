
import { useEffect, useState } from "react";

import API from "../../services/api";

import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {

      const response = await API.get("/products");
console.log(response.data);
      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="bg-[#f8faf8] py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

<p className="text-orange-500 uppercase tracking-[4px] mb-4 font-semibold">            Our Products
          </p>
<h2 className="text-4xl md:text-5xl font-bold text-gray-900">
  Featured Products
</h2>
<p className="text-gray-600 mt-4 max-w-2xl mx-auto">
  Discover our latest export-quality fruits, vegetables and agricultural products.
</p>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

         {Array.isArray(products) &&
  products.map((product) => (
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

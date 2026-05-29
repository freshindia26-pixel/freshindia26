
import { useEffect, useState } from "react";

import AdminNavbar from "../components/navbar/AdminNavbar";

import API from "../services/api";

import { motion } from "framer-motion";

const AdminProducts = () => {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [newProduct, setNewProduct] =
    useState({
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      image_url: "",
    });

  // FETCH PRODUCTS

  const fetchProducts = async () => {
    try {

      const response = await API.get(
        "/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT

  const deleteProduct = async (id) => {
    try {

      await API.delete(`/products/${id}`);

      fetchProducts();

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE PRODUCT

  const updateProduct = async () => {
    try {

      await API.put(
        `/products/${editingProduct.id}`,
        editingProduct
      );

      setEditingProduct(null);

      fetchProducts();

    } catch (error) {

      console.log(error);
    }
  };

  // CREATE PRODUCT

  const createProduct = async () => {
    try {

      await API.post(
        "/products",
        newProduct
      );

      setShowAddModal(false);

      setNewProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
      });

      fetchProducts();

    } catch (error) {

      console.log(error);
    }
  };

  // FILTER PRODUCTS

  const filteredProducts = products.filter(
    (product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-16">

            <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
              Product Management
            </p>

            <h1 className="text-6xl font-bold">
              Manage Products
            </h1>

          </div>

          {/* ADD PRODUCT BUTTON */}

          <button
            onClick={() =>
              setShowAddModal(true)
            }
            className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition mb-10"
          >
            + Add Product
          </button>

          {/* SEARCH */}

          <div className="mb-12">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-white/5 border border-yellow-500/20 rounded-2xl px-6 py-4 outline-none"
            />

          </div>

          {/* PRODUCTS GRID */}

          <div className="grid md:grid-cols-3 gap-10">

            {filteredProducts.map(
              (product, index) => (

                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="bg-white/5 border border-yellow-500/20 rounded-3xl overflow-hidden"
                >

                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-6">

                    <div className="flex items-center justify-between">

                      <h2 className="text-3xl font-bold">
                        {product.name}
                      </h2>

                      {product.stock < 10 && (
                        <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                          Low Stock
                        </span>
                      )}

                    </div>

                    <p className="text-gray-400 mt-4">
                      {product.category}
                    </p>

                    <p className="text-yellow-400 text-3xl font-bold mt-6">
                      ${product.price}
                    </p>

                    <p className="mt-4">
                      Stock:
                      <span className="text-yellow-400 ml-2">
                        {product.stock}
                      </span>
                    </p>

                    {/* ACTION BUTTONS */}

                    <div className="flex gap-4 mt-8">

                      <button
                        onClick={() =>
                          setEditingProduct(
                            product
                          )
                        }
                        className="flex-1 bg-yellow-500 text-black py-3 rounded-full font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                        className="flex-1 bg-red-500 text-white py-3 rounded-full font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </motion.div>

              )
            )}

          </div>

        </div>

      </div>

      {/* EDIT MODAL */}

      {editingProduct && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">

          <div className="bg-[#111] border border-yellow-500/20 rounded-3xl p-10 w-full max-w-2xl">

            <h2 className="text-4xl font-bold mb-10">
              Edit Product
            </h2>

            <div className="space-y-6">

              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <input
                type="text"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <input
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <input
                type="text"
                value={editingProduct.image_url}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image_url:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <textarea
                rows="4"
                value={
                  editingProduct.description
                }
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <div className="flex gap-4">

                <button
                  onClick={updateProduct}
                  className="flex-1 bg-yellow-500 text-black py-4 rounded-full font-semibold"
                >
                  Save Changes
                </button>

                <button
                  onClick={() =>
                    setEditingProduct(null)
                  }
                  className="flex-1 bg-gray-700 py-4 rounded-full"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ADD MODAL */}

      {showAddModal && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">

          <div className="bg-[#111] border border-yellow-500/20 rounded-3xl p-10 w-full max-w-2xl">

            <h2 className="text-4xl font-bold mb-10">
              Add Product
            </h2>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image_url}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    image_url:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <textarea
                rows="4"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description:
                      e.target.value,
                  })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4"
              />

              <div className="flex gap-4">

                <button
                  onClick={createProduct}
                  className="flex-1 bg-yellow-500 text-black py-4 rounded-full font-semibold"
                >
                  Create Product
                </button>

                <button
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="flex-1 bg-gray-700 py-4 rounded-full"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default AdminProducts;

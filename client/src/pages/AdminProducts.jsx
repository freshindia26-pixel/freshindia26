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

  /* FETCH PRODUCTS */

  const fetchProducts = async () => {
    try {

      const response =
        await API.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* DELETE PRODUCT */

  const deleteProduct = async (id) => {
    try {

      await API.delete(
        `/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);
    }
  };

  /* UPDATE PRODUCT */

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

  /* CREATE PRODUCT */

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

  /* FILTER */

  const filteredProducts =
    products.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">

            <div>

              <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
                Product Management
              </span>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Manage Products
              </h1>

            </div>

            <button
              onClick={() =>
                setShowAddModal(true)
              }
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold transition"
            >
              + Add Product
            </button>

          </div>

          {/* SEARCH */}

          <div className="mb-14">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-white border border-green-100 rounded-2xl px-6 py-4 outline-none focus:border-green-600 shadow-sm"
            />

          </div>

          {/* GRID */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

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
                    delay:
                      index * 0.05,
                  }}
                  className="bg-white border border-green-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
                >

                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-7">

                    <div className="flex items-center justify-between gap-4">

                      <h2 className="text-3xl font-bold text-gray-900">
                        {product.name}
                      </h2>

                      {product.stock < 10 && (

                        <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium">
                          Low Stock
                        </span>

                      )}

                    </div>

                    <p className="text-gray-500 mt-4">
                      {product.category}
                    </p>

                    <p className="text-orange-500 text-4xl font-bold mt-6">
                      ₹ {product.price}
                    </p>

                    <p className="mt-4 text-gray-700">
                      Stock:
                      <span className="text-green-700 font-semibold ml-2">
                        {product.stock}
                      </span>
                    </p>

                    {/* ACTIONS */}

                    <div className="flex gap-4 mt-8">

                      <button
                        onClick={() =>
                          setEditingProduct(product)
                        }
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-semibold transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold transition"
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

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">

          <div className="bg-white rounded-3xl p-10 w-full max-w-2xl">

            <h2 className="text-4xl font-bold text-gray-900 mb-10">
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
              />

              <textarea
                rows="4"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description:
                      e.target.value,
                  })
                }
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
              />

              <div className="flex gap-4">

                <button
                  onClick={updateProduct}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white py-4 rounded-full font-semibold transition"
                >
                  Save Changes
                </button>

                <button
                  onClick={() =>
                    setEditingProduct(null)
                  }
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-full font-semibold transition"
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

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">

          <div className="bg-white rounded-3xl p-10 w-full max-w-2xl">

            <h2 className="text-4xl font-bold text-gray-900 mb-10">
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
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
                className="w-full border border-green-100 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
              />

              <div className="flex gap-4">

                <button
                  onClick={createProduct}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white py-4 rounded-full font-semibold transition"
                >
                  Create Product
                </button>

                <button
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-full font-semibold transition"
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
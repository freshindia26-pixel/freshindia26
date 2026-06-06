import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.post(
          "/auth/login",
          formData
        );

      /* CHECK ADMIN */

      if (
        response.data.user.role !==
        "admin"
      ) {

        alert(
          "Access Denied"
        );

        return;
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",

        JSON.stringify(
          response.data.user
        )
      );

      alert(
        "Admin Login Success"
      );

      navigate("/admin");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-2xl border border-green-100">

        {/* LEFT SIDE */}

        <div className="bg-gradient-to-br from-green-700 to-green-900 text-white p-14 flex flex-col justify-center">

          <span className="inline-block bg-white/20 px-5 py-2 rounded-full text-sm font-medium w-fit mb-8">
            FreshIndia Admin Portal
          </span>

          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
          </h1>

          <p className="mt-8 text-green-100 leading-8 text-lg">
            Manage orders, products,
            analytics and customer enquiries
            from the FreshIndia admin dashboard.
          </p>

          <div className="mt-14 space-y-5">

            <div className="flex items-center gap-4">
              <span className="text-2xl">
                📦
              </span>

              <p>
                Order Management
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">
                🌍
              </span>

              <p>
                Export Enquiries
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">
                📈
              </span>

              <p>
                Business Analytics
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-12 md:p-16 flex flex-col justify-center">

          <div className="mb-10">

            <span className="inline-block bg-orange-100 text-orange-500 px-5 py-2 rounded-full font-medium mb-5">
              Secure Login
            </span>

            <h2 className="text-4xl font-bold text-gray-900">
              Admin Login
            </h2>

            <p className="text-gray-500 mt-4">
              Login to access the admin dashboard.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#f8faf8] border border-green-100 rounded-2xl px-6 py-5 outline-none focus:border-green-700 transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#f8faf8] border border-green-100 rounded-2xl px-6 py-5 outline-none focus:border-green-700 transition"
            />

            <button className="w-full bg-green-700 hover:bg-green-800 text-white py-5 rounded-2xl font-semibold text-lg transition shadow-lg">

              Login To Dashboard

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
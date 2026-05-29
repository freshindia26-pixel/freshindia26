
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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      // CHECK ADMIN

      if (
        response.data.user.role !== "admin"
      ) {
        alert("Access Denied");

        return;
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Admin Login Success");

      navigate("/admin");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

        <h1 className="text-5xl font-bold text-yellow-400 mb-10 text-center">
          Admin Login
        </h1>

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
            className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-black border border-yellow-500/20 rounded-xl px-5 py-4 outline-none"
          />

          <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-semibold hover:scale-105 transition">
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;

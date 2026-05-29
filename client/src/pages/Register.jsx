
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-10"
      >

        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          Register
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black/40 border border-yellow-500/20 rounded-xl px-5 py-4 text-white outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black/40 border border-yellow-500/20 rounded-xl px-5 py-4 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-black/40 border border-yellow-500/20 rounded-xl px-5 py-4 text-white outline-none"
          />

          <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-semibold hover:scale-105 transition">
            Create Account
          </button>

        </div>

      </form>

    </div>
  );
};

export default Register;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-10">

          <div className="text-center mb-8">

            <span className="inline-block bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Join FreshIndia
            </span>

            <h1 className="text-4xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-600 mt-3">
              Register to start ordering premium export products
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-green-200 rounded-xl px-5 py-4 text-gray-800 outline-none focus:border-green-600"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-green-200 rounded-xl px-5 py-4 text-gray-800 outline-none focus:border-green-600"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-green-200 rounded-xl px-5 py-4 text-gray-800 outline-none focus:border-green-600"
              required
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition"
            >
              Create Account
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-600">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-green-700 font-semibold hover:text-green-800"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
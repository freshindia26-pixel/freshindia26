import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-10">

          <div className="text-center mb-8">

            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Welcome Back
            </span>

            <h1 className="text-4xl font-bold text-gray-900">
              Login
            </h1>

            <p className="text-gray-600 mt-3">
              Access your FreshIndia account
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

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
              className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold transition"
            >
              Login
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-600">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/admin-login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black border-b border-yellow-500/20 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* LOGO */}

        <Link to="/admin">
          <h1 className="text-3xl font-bold text-yellow-400 cursor-pointer">
            FreshIndia Admin
          </h1>
        </Link>

        {/* NAV LINKS */}

        <div className="flex items-center gap-8 text-white">

          <Link
            to="/admin"
            className="hover:text-yellow-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className="hover:text-yellow-400 transition"
          >
            Orders
          </Link>

          <Link
            to="/admin/products"
            className="hover:text-yellow-400 transition"
          >
            Products
          </Link>

          <Link
            to="/admin/analytics"
            className="hover:text-yellow-400 transition"
          >
            Analytics
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-2 rounded-full hover:scale-105 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
};

export default AdminNavbar;

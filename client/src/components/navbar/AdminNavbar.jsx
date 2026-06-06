import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/admin-login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-green-100 shadow-sm z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* LOGO */}

        <Link to="/admin">

          <h1 className="text-3xl font-bold text-green-700 cursor-pointer">
            FreshIndia Admin
          </h1>

        </Link>

        {/* NAV LINKS */}

        <div className="flex items-center gap-8 text-gray-700 font-medium">

          <Link
            to="/admin"
            className="hover:text-green-700 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className="hover:text-green-700 transition"
          >
            Orders
          </Link>

          <Link
            to="/admin/products"
            className="hover:text-green-700 transition"
          >
            Products
          </Link>

          <Link
            to="/admin/enquiries"
            className="hover:text-green-700 transition"
          >
            Enquiries
          </Link>

          <Link
            to="/admin/analytics"
            className="hover:text-green-700 transition"
          >
            Analytics
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
};

export default AdminNavbar;
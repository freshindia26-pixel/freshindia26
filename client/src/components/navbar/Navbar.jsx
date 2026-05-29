
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-yellow-500/20">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}

        <Link to="/">
          <h1 className="text-3xl font-bold text-yellow-400 cursor-pointer">
            FreshIndia
          </h1>
        </Link>
  
<Link to="/cart">
  <li className="hover:text-yellow-400 transition cursor-pointer">
    Cart
  </li>
</Link>


        {/* DESKTOP MENU */}

        <ul className="hidden md:flex gap-8 text-white items-center">

          <Link to="/">
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Home
            </li>
          </Link>

          <Link to="/products">
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Products
            </li>
          </Link>

          {user && (
            <>
              <Link to="/my-orders">
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  My Orders
                </li>
              </Link>

              <Link to="/profile">
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Profile
                </li>
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin/orders">
              <li className="hover:text-yellow-400 transition cursor-pointer">
                Admin
              </li>
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login">
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Login
                </li>
              </Link>

              <Link to="/register">
                <li className="bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition cursor-pointer">
                  Register
                </li>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Logout
            </button>
          )}

        </ul>

        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden text-white text-4xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-yellow-500/20">

          <div className="flex flex-col px-6 py-8 gap-6 text-white text-lg">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              <p className="hover:text-yellow-400 transition">
                Home
              </p>
            </Link>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
            >
              <p className="hover:text-yellow-400 transition">
                Products
              </p>
            </Link>

            {user && (
              <>
                <Link
                  to="/my-orders"
                  onClick={() => setMenuOpen(false)}
                >
                  <p className="hover:text-yellow-400 transition">
                    My Orders
                  </p>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  <p className="hover:text-yellow-400 transition">
                    Profile
                  </p>
                </Link>
              </>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  <p className="hover:text-yellow-400 transition">
                    Login
                  </p>
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="bg-yellow-500 text-black px-5 py-3 rounded-full font-semibold w-full">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-3 rounded-full font-semibold w-full"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;
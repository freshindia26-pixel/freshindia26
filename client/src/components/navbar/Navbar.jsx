import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import logo from "../../assets/freshindia-logo.jpeg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

const totalCartItems = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-green-100">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}

        <Link to="/">
          <img
            src={logo}
            alt="FreshIndia"
            className="h-16 w-auto cursor-pointer"
          />
        </Link>

        {/* DESKTOP MENU */}

        <ul className="hidden md:flex items-center gap-8 text-green-700 font-medium">

          <Link to="/">
            <li className="hover:text-orange-500 transition cursor-pointer">
              Home
            </li>
          </Link>

          <Link to="/products">
            <li className="hover:text-orange-500 transition cursor-pointer">
              Products
            </li>
          </Link>

          <Link to="/catalogue">
            <li className="hover:text-orange-500 transition cursor-pointer">
              Catalogue
            </li>
          </Link>
<Link to="/cart">
  <li className="hover:text-orange-500 transition cursor-pointer relative">
    🛒 Cart

    {totalCartItems > 0 && (
      <span className="absolute -top-3 -right-5 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {totalCartItems}
      </span>
    )}
  </li>
</Link>
          <Link to="/bulk-enquiry">
            <li className="hover:text-orange-500 transition cursor-pointer">
              Bulk Enquiry
            </li>
          </Link>

          {user && (
            <>
              <Link to="/my-orders">
                <li className="hover:text-orange-500 transition cursor-pointer">
                  My Orders
                </li>
              </Link>

              <Link to="/profile">
                <li className="hover:text-orange-500 transition cursor-pointer">
                  Profile
                </li>
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login">
                <li className="hover:text-orange-500 transition cursor-pointer">
                  Login
                </li>
              </Link>

              <Link to="/register">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              Logout
            </button>
          )}

        </ul>

        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden text-green-700 text-4xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 shadow-lg">

          <div className="flex flex-col px-6 py-8 gap-6 text-green-700 text-lg font-medium">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              <p className="hover:text-orange-500 transition">
                Home
              </p>
            </Link>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
            >
              <p className="hover:text-orange-500 transition">
                Products
              </p>
            </Link>

            <Link
              to="/catalogue"
              onClick={() => setMenuOpen(false)}
            >
              <p className="hover:text-orange-500 transition">
                Catalogue
              </p>
            </Link>

            <Link
              to="/bulk-enquiry"
              onClick={() => setMenuOpen(false)}
            >
              <p className="hover:text-orange-500 transition">
                Bulk Enquiry
              </p>
            </Link>

            {user && (
              <>
                <Link
                  to="/my-orders"
                  onClick={() => setMenuOpen(false)}
                >
                  <p className="hover:text-orange-500 transition">
                    My Orders
                  </p>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  <p className="hover:text-orange-500 transition">
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
                  <p className="hover:text-orange-500 transition">
                    Login
                  </p>
                </Link>
                <Link
  to="/cart"
  className="hover:text-orange-500 transition"
>
  Cart
</Link>
<Link to="/catalogue">
  Catalogue
</Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-full font-semibold transition">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-full font-semibold transition"
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
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// COMMON COMPONENTS
import BulkEnquiry from "./pages/BulkEnquiry";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/common/Footer";
import WhatsappButton from "./components/common/WhatsappButton";
import Catalogue from "./pages/Catalogue";
// PROTECTED ROUTES
import AdminEnquiries from "./pages/AdminEnquiries";
import ProtectedRoute from "./components/protected/ProtectedRoute";

import AdminRoute from "./components/protected/AdminRoute";

// USER PAGES

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";

// ADMIN PAGES

import AdminLogin from "./pages/AdminLogin";

import AdminDashboard from "./pages/AdminDashboard";

import AdminOrders from "./pages/AdminOrders";

import AdminProducts from "./pages/AdminProducts";

import AdminAnalytics from "./pages/AdminAnalytics";

function AppContent() {

  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* USER NAVBAR */}

      {!isAdminPage && <Navbar />}

      {/* ROUTES */}

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />
        <Route
  path="/admin/enquiries"
  element={
    <AdminRoute>
      <AdminEnquiries />
    </AdminRoute>
  }
/>
<Route
  path="/catalogue"
  element={<Catalogue />}
/>
        <Route
          path="/products"
          element={<ProductsPage />}
        />
<Route
  path="/bulk-enquiry"
  element={<BulkEnquiry />}
/>
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROTECTED USER ROUTES */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

       <Route
  path="/cart"
  element={<Cart />}
/>

        {/* ADMIN LOGIN */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          }
        />

      </Routes>

      {/* USER FOOTER */}

      {!isAdminPage && <Footer />}

      {/* WHATSAPP */}

      {!isAdminPage && (
        <WhatsappButton />
      )}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from '../components/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import About from '../components/About';
import ProductManagement from '../pages/products/ProductManagement';
import ProductList from '../pages/products/ProductList';
import CheckoutPage from '../pages/checkoutPage/CheckoutPage';
import Payment from '../pages/payment/Payment';
import AddressManagement from '../pages/address/AddressManagement';
import PaymentSuccess from '../pages/payment/PaymentSuccess';
import PaymentFailed from '../pages/payment/paymentFailed';
import OrderTracking from '../pages/orders/OrderTracking';
import Profile from '../pages/profile/Profile'; // Make sure this path is correct
import { ProtectedRoute } from '../routes/ProtectedRoute';
import MyOrders from '../pages/orders/MyOrders';

const AppRoutes = () => {
  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <ProductManagement />
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
        path="/product-list"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-tracking"
        element={
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/address"
        element={
          <ProtectedRoute>
            <AddressManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      {/* Public routes for payment results */}
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />

      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

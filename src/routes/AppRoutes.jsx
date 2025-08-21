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

import { ProtectedRoute } from '../routes/ProtectedRoute';

// We’ll add protected routes and dashboards later
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

      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <ProductManagement />
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

      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/address" element={<AddressManagement />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />
    </Routes>
  );
};

export default AppRoutes;

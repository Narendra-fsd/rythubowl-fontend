// PaymentSuccess.jsx
import React from 'react';
import { CheckCircle, ArrowRight, ShoppingBag, Home } from 'lucide-react';
import './PaymentSuccess.css';
import Header from '../../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderDetails = location.state?.orderDetails || {};
  const orderId = location.state?.orderId || '';
  const amount = location.state?.amount || '';
  const paymentId = location.state?.paymentId || '';

  const handleViewOrders = () => {
    // Navigate to orders page
    navigate('/order-tracking', {
      state: { orderDetails, orderId, amount, paymentId },
    });
  };

  const handleBackToHome = () => {
    // Navigate to home page

    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="payment-container success-bg">
        <div className="payment-card success-card">
          <div className="animation-container">
            <div className="success-checkmark">
              <CheckCircle size={80} />
            </div>
            <div className="confetti">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="confetti-piece"></div>
              ))}
            </div>
          </div>

          <h1 className="payment-title">Payment Successful!</h1>

          <p className="payment-message">
            Thank you for your purchase. Your order has been confirmed and will
            be processed shortly.
          </p>

          <div className="order-details">
            <div className="detail-row">
              <span className="detail-label">Order ID:</span>
              <span className="detail-value">{orderId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Amount Paid:</span>
              <span className="detail-value">{amount}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">paymentId:</span>
              <span className="detail-value">{paymentId}</span>
            </div>
          </div>

          <div className="button-group">
            <button
              className="btn btn-primary btn-orders"
              onClick={handleViewOrders}
            >
              View Orders <ArrowRight size={20} className="icon-right" />
            </button>

            <button
              className="btn btn-secondary btn-home"
              onClick={handleBackToHome}
            >
              <Home size={18} className="icon-left" /> Back to Home
            </button>
          </div>

          <div className="success-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Order confirmed</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Payment processed</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Receipt emailed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;

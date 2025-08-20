// PaymentSuccess.jsx
import React from 'react';
import { CheckCircle, ArrowRight, ShoppingBag, Home } from 'lucide-react';
import './PaymentSuccess.css';
import Header from '../../components/Header';

const PaymentSuccess = () => {
  const handleViewOrders = () => {
    // Navigate to orders page
    console.log('Navigate to orders page');
  };

  const handleBackToHome = () => {
    // Navigate to home page
    console.log('Navigate to home page');
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
              <span className="detail-value">#ORD-2023-78945</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Amount Paid:</span>
              <span className="detail-value">$149.99</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value">Credit Card</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Estimated Delivery:</span>
              <span className="detail-value">July 15, 2023</span>
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

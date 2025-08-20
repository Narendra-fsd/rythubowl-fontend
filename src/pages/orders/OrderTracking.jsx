import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderTracking.css';

const OrderTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails || {};
  const orderId = location.state?.orderId || '';
  const amount = location.state?.amount || '';
  const paymentId = location.state?.paymentId || '';
  const [isVisible, setIsVisible] = useState(false);

  const OrderItems = orderDetails.OrderItems || [];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBackToHome = () => {
    setIsVisible(false);
    setTimeout(() => navigate('/'), 300);
  };

  return (
    <div className={`order-tracking-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <div className="order-header">
        <h1 className="order-title">Order Confirmation</h1>
        <p className="order-subtitle">Thank you for your purchase!</p>
      </div>

      <div className="order-summary-card">
        <div className="order-id-section">
          <h2>Order #<span className="highlight">{orderId}</span></h2>
          <div className="status-badge">Confirmed</div>
        </div>
        
        <div className="payment-details">
          <div className="detail-item">
            <span className="detail-label">Total Amount:</span>
            <span className="detail-value">₹{amount}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Payment ID:</span>
            <span className="detail-value">{paymentId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Order Date:</span>
            <span className="detail-value">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="order-items-section">
        <h3 className="section-title">Order Items</h3>
        <div className="items-grid">
          {OrderItems.map((order, index) => (
            <div 
              key={order.id} 
              className="order-item-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="item-image-container">
                <img
                  src={order.imageUrl}
                  alt={order.name}
                  className="item-image"
                />
              </div>
              <div className="item-details">
                <h4 className="item-name">{order.name}</h4>
                <div className="item-meta">
                  <span className="item-price">₹{order.price}</span>
                  <span className="item-quantity">Qty: {order.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-container">
        <h3 className="section-title">Order Status</h3>
        <div className="progress-tracker">
          <div className="progress-step completed">
            <div className="step-icon">
              <span className="checkmark">✓</span>
            </div>
            <div className="step-info">
              <p className="step-title">Order Placed</p>
              <p className="step-description">Your order has been received</p>
            </div>
          </div>
          
          <div className="progress-step active">
            <div className="step-icon">
              <span className="step-number">2</span>
            </div>
            <div className="step-info">
              <p className="step-title">Processing</p>
              <p className="step-description">Preparing your order</p>
            </div>
          </div>
          
          <div className="progress-step">
            <div className="step-icon">
              <span className="step-number">3</span>
            </div>
            <div className="step-info">
              <p className="step-title">Shipped</p>
              <p className="step-description">On the way to you</p>
            </div>
          </div>
          
          <div className="progress-step">
            <div className="step-icon">
              <span className="step-number">4</span>
            </div>
            <div className="step-info">
              <p className="step-title">Delivered</p>
              <p className="step-description">Order completed</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="back-home-btn"
        onClick={handleBackToHome}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderTracking;
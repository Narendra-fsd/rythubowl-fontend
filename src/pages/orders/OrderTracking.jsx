import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './OrderTracking.css';

const OrderTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails || {};
  const orderId = location.state?.orderId || '';
  const amount = location.state?.amount || '';
  const paymentId = location.state?.paymentId || '';
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Order Placed, 1: Processing, etc.

  const OrderItems = orderDetails.OrderItems || [];
  
  // Define order steps
  const orderSteps = [
    {
      title: "Order Placed",
      description: "Your order has been received"
    },
    {
      title: "Processing",
      description: "Preparing your order"
    },
    {
      title: "Shipped",
      description: "On the way to you"
    },
    {
      title: "Delivered",
      description: "Order completed"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Set up the interval for automatic progression
    const interval = setInterval(() => {
      setCurrentStep(prevStep => {
        if (prevStep < orderSteps.length - 1) {
          return prevStep + 1;
        } else {
          clearInterval(interval); // Stop at the final step
          return prevStep;
        }
      });
    }, 5000); // 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleBackToHome = () => {
    setIsVisible(false);
    setTimeout(() => navigate('/'), 300);
  };

  return (
    <>
      <Header />
      <div
        className={`order-tracking-container ${isVisible ? 'fade-in' : 'fade-out'}`}
      >
        <div className="order-header">
          <h1 className="order-title">Order Confirmation</h1>
          <p className="order-subtitle">Thank you for your purchase!</p>
        </div>

        <div className="order-summary-card">
          <div className="order-id-section">
            <h2>
              Order #<span className="highlight">{orderId}</span>
            </h2>
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
              <span className="detail-value">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="order-items-section">
          <h3 className="section-title">Order Items</h3>
          <div className="items-grid">
            {OrderItems.map((order, index) => (
              <div
                key={order._id}
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
            {orderSteps.map((step, index) => (
              <div 
                key={index} 
                className={`progress-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
              >
                <div className="step-icon">
                  {index <= currentStep ? (
                    <span className="checkmark">✓</span>
                  ) : (
                    <span className="step-number">{index + 1}</span>
                  )}
                </div>
                <div className="step-info">
                  <p className="step-title">{step.title}</p>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
            
            {/* Progress bar */}
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / (orderSteps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <button className="back-home-btn" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
      <Footer />
    </>
  );
};

export default OrderTracking;
// PaymentFailed.jsx
import React from 'react';
import { XCircle, ArrowRight, Home, CreditCard } from 'lucide-react';
import './PaymentFailed.css';
import Header from '../../components/Header';

const PaymentFailed = () => {
  const handleTryAgain = () => {
    // Navigate to address page
    console.log('Navigate to address page');
  };

  const handleBackToHome = () => {
    // Navigate to home page
    console.log('Navigate to home page');
  };

  return (
    <>
      <Header />
      <div className="payment-container failed-bg">
        <div className="payment-card failed-card">
          <div className="animation-container">
            <div className="failed-x">
              <XCircle size={80} />
            </div>
          </div>

          <h1 className="payment-title failed-title">Payment Failed</h1>

          <p className="payment-message failed-message">
            Unfortunately, we couldn't process your payment. Please check your
            payment details and try again.
          </p>

          <div className="error-details">
            <h3>Possible reasons:</h3>
            <ul>
              <li>Insufficient funds in your account</li>
              <li>Bank declined the transaction</li>
              <li>Technical error during processing</li>
            </ul>
          </div>

          <div className="button-group">
            <button
              className="btn btn-primary btn-try-again"
              onClick={handleTryAgain}
            >
              <CreditCard size={20} className="icon-left" /> Back To Address
            </button>

            <button
              className="btn btn-secondary btn-home"
              onClick={handleBackToHome}
            >
              <Home size={18} className="icon-left" /> Back to Home
            </button>
          </div>

          <div className="support-section">
            <p>Need help? Contact our support team</p>
            <div className="contact-info">
              <span>rythubowl@gmail.com</span>
              <span>+91 8008072852</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;

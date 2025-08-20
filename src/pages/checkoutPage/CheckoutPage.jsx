import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, CreditCard, Truck } from 'lucide-react';
import './CheckoutPage.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] };
  // const [amount, setAmount] = useState();
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const deliveryFee = deliveryOption === 'express' ? 5.99 : 2.99;
    // setAmount(subtotal + deliveryFee.toFixed(2));
    return (subtotal + deliveryFee).toFixed(2);
  };

  // const handlePayment = () => {
  //   console.log('Payment initiated');
  //   const amount = calculateTotal();
  //   navigate('/payment', { state: { amount } });
  // };
  const handleCheckout = () => {
    console.log('Checkout initiated');
    const amount = calculateTotal();

    navigate('/address', {
      state: { cart, deliveryOption, paymentMethod, amount },
    });
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <div className="checkout-header">
          <button className="back-button" onClick={() => window.history.back()}>
            <ChevronLeft size={20} />
            Back to Cart
          </button>
          <h1 className="checkout-title">Checkout</h1>
        </div>
        <div className="checkout-content">
          {/* Order Summary Section */}
          <div className="order-summary-section">
            <div className="order-summary">
              <h2 className="section-title">
                <ShoppingCart size={18} className="section-icon" />
                Order Summary
              </h2>
              <div className="order-items">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item._id} className="order-item">
                      <div className="item-image-container">
                        <img
                          src={
                            item.imageUrl ||
                            `https://source.unsplash.com/100x100/?${item.category},${item.name}`
                          }
                          alt={item.name}
                          className="item-image"
                        />
                        <span className="item-quantity">{item.quantity}</span>
                      </div>
                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-category">{item.category}</p>
                        <p className="item-unit">
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                      <div className="item-price">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-cart-message">Your cart is empty</div>
                )}
              </div>
              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                <div className="total-row">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryOption === 'express' ? '5.99' : '2.99'}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Delivery & Payment Section */}
          <div className="checkout-form-section">
            <div className="checkout-form">
              {/* Delivery Options */}
              <div className="form-section">
                <h2 className="section-title">
                  <Truck size={18} className="section-icon" />
                  Delivery Options
                </h2>
                <div className="delivery-options">
                  <label
                    className={`delivery-option ${deliveryOption === 'standard' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                    />
                    <div className="option-content">
                      <h3>Standard Delivery</h3>
                      <p>2-3 business days</p>
                      <span className="option-price">₹2.99</span>
                    </div>
                  </label>
                  <label
                    className={`delivery-option ${deliveryOption === 'express' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                    />
                    <div className="option-content">
                      <h3>Express Delivery</h3>
                      <p>Next business day</p>
                      <span className="option-price">₹5.99</span>
                    </div>
                  </label>
                </div>
              </div>
              {/* Payment Method */}
              <div className="form-section">
                <h2 className="section-title">
                  <CreditCard size={18} className="section-icon" />
                  Payment Method
                </h2>
                <div className="payment-options">
                  <label
                    className={`payment-option ${paymentMethod === 'credit' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={() => setPaymentMethod('credit')}
                    />
                    <div className="option-content">
                      <h3>Credit/Debit Card</h3>
                      <p>Pay with Visa, Mastercard, etc.</p>
                    </div>
                  </label>
                  <label
                    className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <div className="option-content">
                      <h3>UPI Payment</h3>
                      <p>Pay via Google Pay, PhonePe, etc.</p>
                    </div>
                  </label>
                  <label
                    className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div className="option-content">
                      <h3>Cash on Delivery</h3>
                      <p>Pay when you receive your order</p>
                    </div>
                  </label>
                </div>
              </div>
              {/* Place Order Button */}
              <button
                className="place-order-button"
                onClick={() => handleCheckout()}
              >
                checkout - ₹{calculateTotal()}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};

  const amount = location.state?.amount || '';
  const OrderItems = location.state?.OrderItems || [];
  const selectedAddress = location.state?.selectedAddress || '';
  const customerDetails = location.state?.customerDetails || '';

  const [orderDetails, setOrderDetails] = useState({
    userId: userDetails.id, // Example user ID, replace with actual user ID logic
    customerDetails: customerDetails,
    OrderItems: OrderItems, // Example order items, replace with actual order items logic],
    // Example order items, replace with actual order items logic
  });
  const [razorpayKey, setRazorpayKey] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get Razorpay key from backend
    axios
      .get('http://localhost:5000/api/payments/get-key')
      .then((response) => {
        setRazorpayKey(response.data.key);
      })
      .catch((error) => {
        console.error('Error fetching Razorpay key:', error);
      });
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    setLoading(true);

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // Create order
      const orderResponse = await axios.post(
        'http://localhost:5000/api/payments/create-order',
        {
          orderDetails: orderDetails,
          amount: parseFloat(amount),
          currency: 'INR',
        }
      );

      const {
        id: orderId,
        amount: orderAmount,
        currency,
      } = orderResponse.data.order;

      // Razorpay options
      const options = {
        key: razorpayKey,
        amount: orderAmount,
        currency: currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: orderId,
        handler: async function (response) {
          // Verify payment
          try {
            const verifyResponse = await axios.post(
              'http://localhost:5000/api/payments/verify-payment',
              {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              console.log('Payment successful:', verifyResponse.data.data);
              alert(`Payment Successful!${verifyResponse.data.data}`);
              navigate('/payment-success', {
                state: {
                  orderDetails: verifyResponse.data.data.orderDetails,
                  amount: verifyResponse.data.data.amount,
                  orderId: verifyResponse.data.data.orderId,
                  paymentId: verifyResponse.data.data.paymentId,
                },
              });
              // Handle successful payment (update database, etc.)
            } else {
              alert('Payment verification failed');
              navigate('/payment-failure');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification error');
            navigate('/payment-failure');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && amount > 0) {
      displayRazorpay();
    } else {
      alert('Please enter a valid amount');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Razorpay Payment Integration</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label
            htmlFor="amount"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Amount (INR):{amount}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !razorpayKey}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      {!razorpayKey && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          Loading payment gateway...
        </p>
      )}
    </div>
  );
};

export default Payment;

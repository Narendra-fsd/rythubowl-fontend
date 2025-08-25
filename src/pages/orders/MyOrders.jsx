import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrders.css';

const MyOrders = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrderByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/user/${userId}`
      );
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userOrderDetails = await getOrderByUserId(userDetails.id);
        setUserOrders(userOrderDetails.data.orders);
        setError(null);
      } catch (error) {
        console.error('Error fetching user orders:', error);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userDetails && userDetails.id) {
      fetchOrders();
    } else {
      setError('User not found. Please log in again.');
      setLoading(false);
    }
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed':
        return '#2196F3';
      case 'Completed':
        return '#4CAF50';
      case 'Cancelled':
        return '#F44336';
      case 'Processing':
        return '#FF9800';
      default:
        return '#757575';
    }
  };

  if (loading) {
    return (
      <div className="my-orders-container">
        <div className="loading-spinner">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>

      {userOrders.length === 0 ? (
        <div className="no-orders">
          <h2>You haven't placed any orders yet</h2>
          <p>Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="orders-list">
          {userOrders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
                  <p className="order-date">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="order-status">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-details">
                <div className="order-items">
                  <h3>Items</h3>
                  {order.OrderItems.map((item) => (
                    <div key={item._id} className="order-item">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <div className="item-meta">
                          <span className="item-quantity">
                            {item.quantity} {item.unit}
                          </span>
                          <span className="item-price">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{order.amount - 2.99}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee:</span>
                    <span>₹2.99</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>₹{order.amount}</span>
                  </div>

                  <div className="payment-info">
                    <h3>Payment Information</h3>
                    <p>
                      Status:{' '}
                      <span className="payment-status">
                        {order.paymentStatus}
                      </span>
                    </p>
                    <p>Payment ID: {order.paymentOrderId}</p>
                  </div>

                  <div className="customer-info">
                    <h3>Customer Details</h3>
                    <p>Name: {order.customerDetails.name}</p>
                    <p>Email: {order.customerDetails.email}</p>
                    <p>Phone: {order.customerDetails.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

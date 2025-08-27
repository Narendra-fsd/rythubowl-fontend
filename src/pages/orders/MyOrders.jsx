import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrders.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MyOrders = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        return '#3a5a40'; // deep-green
      case 'Completed':
        return '#4CAF50';
      case 'Cancelled':
        return '#e74c3c';
      case 'Processing':
        return '#FF9800';
      default:
        return '#6b7280'; // text-gray
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  if (loading) {
    return (
      <div className="my-order-container">
        <div className="my-order-loading-container">
          <div className="my-order-leaf-spinner">
            <div className="my-order-leaf my-order-leaf-1"></div>
            <div className="my-order-leaf my-order-leaf-2"></div>
            <div className="my-order-leaf my-order-leaf-3"></div>
          </div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-order-container">
        <div className="my-order-error-container">
          <div className="my-order-error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            className="my-order-retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="my-order-container">
        <div className="my-order-header">
          <h1>My Orders</h1>
          <p>Track and manage your purchases</p>
        </div>

        {userOrders.length === 0 ? (
          <div className="my-order-no-orders">
            <div className="my-order-no-orders-icon">🛒</div>
            <h2>You haven't placed any orders yet</h2>
            <p>Discover our products and make your first purchase!</p>
            <button className="my-order-shop-now-btn">Start Shopping</button>
          </div>
        ) : (
          <div className="my-order-content">
            <div className="my-order-list">
              {userOrders.map((order) => (
                <div
                  key={order._id}
                  className="my-order-card"
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="my-order-card-header">
                    <div className="my-order-id">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </div>
                    <div
                      className="my-order-status"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </div>
                  </div>

                  <div className="my-order-card-details">
                    <div className="my-order-date">
                      {formatDate(order.createdAt)}
                    </div>
                    <div className="my-order-amount">₹{order.amount}</div>
                  </div>

                  <div className="my-order-items-preview">
                    {order.OrderItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="my-order-preview-item">
                        <img src={item.imageUrl} alt={item.name} />
                        {index === 2 && order.OrderItems.length > 3 ? (
                          <span>+{order.OrderItems.length - 3} more</span>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="my-order-view-details">View Details →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div
            className={`my-order-modal ${showModal ? 'my-order-modal-active' : ''}`}
          >
            <div className="my-order-modal-backdrop" onClick={closeModal}></div>
            <div className="my-order-modal-content">
              <button className="my-order-modal-close" onClick={closeModal}>
                ×
              </button>

              <div className="my-order-modal-header">
                <h2>Order #{selectedOrder._id.slice(-6).toUpperCase()}</h2>
                <div
                  className="my-order-modal-status"
                  style={{
                    backgroundColor: getStatusColor(selectedOrder.status),
                  }}
                >
                  {selectedOrder.status}
                </div>
              </div>

              <div className="my-order-modal-body">
                <div className="my-order-modal-section">
                  <h3>Order Items</h3>
                  <div className="my-order-modal-items">
                    {selectedOrder.OrderItems.map((item) => (
                      <div key={item._id} className="my-order-modal-item">
                        <img src={item.imageUrl} alt={item.name} />
                        <div className="my-order-modal-item-details">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                          <div className="my-order-modal-item-meta">
                            <span>
                              {item.quantity} {item.unit}
                            </span>
                            <span>₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="my-order-modal-section">
                  <h3>Order Summary</h3>
                  <div className="my-order-modal-summary">
                    <div className="my-order-summary-row">
                      <span>Subtotal:</span>
                      <span>₹{selectedOrder.amount - 2.99}</span>
                    </div>
                    <div className="my-order-summary-row">
                      <span>Delivery Fee:</span>
                      <span>₹2.99</span>
                    </div>
                    <div className="my-order-summary-row my-order-total">
                      <span>Total:</span>
                      <span>₹{selectedOrder.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="my-order-modal-section">
                  <h3>Payment Information</h3>
                  <div className="my-order-payment-info">
                    <div className="my-order-info-row">
                      <span>Status:</span>
                      <span
                        className={`my-order-payment-status ${selectedOrder.paymentStatus.toLowerCase()}`}
                      >
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                    <div className="my-order-info-row">
                      <span>Payment ID:</span>
                      <span>{selectedOrder.paymentOrderId}</span>
                    </div>
                  </div>
                </div>

                <div className="my-order-modal-section">
                  <h3>Customer Details</h3>
                  <div className="my-order-customer-info">
                    <div className="my-order-info-row">
                      <span>Name:</span>
                      <span>{selectedOrder.customerDetails.name}</span>
                    </div>
                    <div className="my-order-info-row">
                      <span>Email:</span>
                      <span>{selectedOrder.customerDetails.email}</span>
                    </div>
                    <div className="my-order-info-row">
                      <span>Phone:</span>
                      <span>{selectedOrder.customerDetails.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;

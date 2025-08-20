// AddressPage.jsx
import React, { useState, useEffect } from 'react';
import '../address/AddressManagement.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddressPage = () => {
  const location = useLocation();
  const { cart, deliveryOption, paymentMethod, amount } = location.state || {};
  const navigate = useNavigate();

  const [insertDummyAddress, setInsertDummyAddress] = useState({});

  const [dummiAddress, setDummyAddress] = useState({});

  console.log('Cart:', cart);
  console.log('Delivery Option:', deliveryOption);
  console.log('Payment Method:', paymentMethod);
  console.log('Amount:', amount);

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    landmark: '',
    label: 'Home',
    isDefault: false,
  });

  // Sample addresses for demonstration
  //   useEffect(() => {
  //     const sampleAddresses = [
  //       {
  //         _id: '1',
  //         street: '123 Main Street',
  //         city: 'New York',
  //         state: 'NY',
  //         zip: '10001',
  //         landmark: 'Near Central Park',
  //         label: 'Home',
  //         isDefault: true,
  //       },
  //       {
  //         _id: '2',
  //         street: '456 Office Blvd',
  //         city: 'New York',
  //         state: 'NY',
  //         zip: '10002',
  //         landmark: 'Opposite City Mall',
  //         label: 'Office',
  //         isDefault: false,
  //       },
  //     ];
  //     setAddresses(sampleAddresses);
  //     setSelectedAddressId(
  //       sampleAddresses.find((addr) => addr.isDefault)?._id || null
  //     );
  //   }, []);

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmitNewAddress = async (e) => {
    e.preventDefault();
    setInsertDummyAddress(newAddress);
    await addAddress(newAddress);

    const newId = Math.random().toString(36).substr(2, 9);
    const addressToAdd = { ...newAddress, _id: newId };

    setAddresses((prev) => [...prev, addressToAdd]);

    if (addressToAdd.isDefault) {
      setSelectedAddressId(newId);
    }

    setNewAddress({
      street: '',
      city: '',
      state: '',
      zip: '',
      landmark: '',
      label: 'Home',
      isDefault: false,
    });

    setShowModal(false);
  };
  const id = '68a380f5270a5ea901f9f3ef';

  const getAddressById = async () => {
    const id = '68a380f5270a5ea901f9f3ef';
    try {
      const response = await axios.get(
        `http://localhost:5000/api/addresses/${id}`
      );
      if (response.data) {
        setAddresses(response.data);
        console.log('Address fetched:', response);
      } else {
        console.error('No address found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const addAddress = async (address) => {
    const payload = {
      ...address,
      userId: '68a380f5270a5ea901f9f3ef',
    };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/addresses/add-address',
        payload
      );

      if (response.data) {
        // setAddresses((prev) => [...prev, response.data]);
        console.log('Address added:', response.data);
      } else {
        console.error('Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      await getAddressById(id);
    };
    fetchAddress();
  }, [id]);

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address);
  };

  const setDefaultAddress = (address) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr._id === id,
      }))
    );
    setSelectedAddressId(address);
  };

  const handleBack = () => {
    // Logic to navigate back to the cart or previous page
    window.history.back();
  };
  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      alert('Please select a delivery address.');
      return;
    }
    navigate('/payment', { state: { amount } });
  };
  console.log('fetched address', addresses);
  console.log('selected address id', selectedAddressId);
  console.log('customer details', customerDetails);
  return (
    <div className="address-page-container">
      <h2 className="page-title">Delivery Information</h2>

      {/* Customer Details Section */}
      <div className="customer-details-section">
        <h3 className="section-title">Your Details</h3>
        <form className="customer-details-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerDetails.name}
              onChange={handleCustomerDetailsChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerDetails.phone}
              onChange={handleCustomerDetailsChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerDetails.email}
              onChange={handleCustomerDetailsChange}
              placeholder="Enter your email address"
            />
          </div>
        </form>
      </div>

      {/* Addresses Section */}
      <div className="addresses-section">
        <div className="section-header">
          <h3 className="section-title">Delivery Address</h3>
          <button
            className="btn-add-address"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-circle"></i> Add New Address
          </button>
        </div>

        <div className="addresses-grid">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`address-card ${selectedAddressId === address ? 'selected' : ''}`}
              onClick={() => handleAddressSelect(address)}
            >
              <div className="address-selector">
                <div
                  className={`selection-circle ${selectedAddressId === address ? 'selected' : ''}`}
                >
                  {selectedAddressId === address && (
                    <i className="bi bi-check"></i>
                  )}
                </div>
              </div>

              <div className="address-content">
                <div className="address-header">
                  <span className="address-label">{address.label}</span>
                  {address.isDefault && (
                    <span className="default-badge">Default</span>
                  )}
                </div>

                <p className="address-text">
                  {address.street}, {address.city}, {address.state} -{' '}
                  {address.zip}
                  {address.landmark && (
                    <span className="landmark"> ({address.landmark})</span>
                  )}
                </p>

                <div className="address-actions">
                  <button
                    className="btn-set-default"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDefaultAddress(address);
                    }}
                    disabled={address.isDefault}
                  >
                    {address.isDefault ? 'Default Address' : 'Set as Default'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-secondary" onClick={() => handleBack()}>
          Back to Cart
        </button>
        <button
          className="btn-primary"
          onClick={() => handleProceedToPayment()}
        >
          Proceed to Payment
        </button>
      </div>

      {/* Add Address Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Address</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitNewAddress}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="label">Address Label</label>
                    <select
                      id="label"
                      name="label"
                      value={newAddress.label}
                      onChange={handleNewAddressChange}
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={handleNewAddressChange}
                    />
                    <label htmlFor="isDefault">Set as default address</label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="street">Street Address</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={newAddress.street}
                    onChange={handleNewAddressChange}
                    placeholder="Enter street address"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={newAddress.city}
                      onChange={handleNewAddressChange}
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={newAddress.state}
                      onChange={handleNewAddressChange}
                      placeholder="Enter state"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zip">ZIP Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={newAddress.zip}
                      onChange={handleNewAddressChange}
                      placeholder="Enter ZIP code"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="landmark">Landmark (Optional)</label>
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      value={newAddress.landmark}
                      onChange={handleNewAddressChange}
                      placeholder="Nearby landmark"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;

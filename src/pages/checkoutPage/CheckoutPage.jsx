import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const { cart } = location.state || {}; // Get cart from state if available

  console.log('Checkout cart:', cart); // Log the cart for debugging
  return <div>this is checkoutPage</div>;
};

export default CheckoutPage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Trash, Plus, Minus, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './productManagement.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { setProductsCart } from '../../Redux/productSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ProductManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.product.productsCart);
  const [products, setProducts] = useState([]);
  const [productCart, setProductCart] = useState(productsCart);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('organicStoreCart');
    if (savedCart) {
      setProductCart(JSON.parse(savedCart));
    }

    fetchProducts();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('organicStoreCart', JSON.stringify(productCart));
  }, [productCart]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // ---------------- CART FUNCTIONS ----------------
  const addToCart = (product) => {
    setProductCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setShowCart(true);
  };

  const incrementCartItem = (id) => {
    setProductCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementCartItem = (id) => {
    setProductCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (id) => {
    setProductCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const handleCheckout = () => {
    dispatch(setProductsCart(productCart));
    navigate('/checkout', { state: { cart: productCart } });
  };

  const calculateTotal = () => {
    return productCart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getItemQuantity = (productId) => {
    const item = productCart.find((item) => item._id === productId);
    return item ? item.quantity : 0;
  };

  const renderCartButton = (product) => {
    const quantity = getItemQuantity(product._id);

    if (quantity === 0) {
      return (
        <button
          onClick={() => addToCart(product)}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      );
    }

    return (
      <div className="quantity-control">
        <button
          onClick={() => decrementCartItem(product._id)}
          className="quantity-button minus-button"
        >
          <Minus size={14} />
        </button>
        <span className="quantity-display">{quantity}</span>
        <button
          onClick={() => incrementCartItem(product._id)}
          className="quantity-button plus-button"
        >
          <Plus size={14} />
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />

      <div className="product-management-container">
        {/* Fixed Sidebar */}
        <div className="sidebar">
          <h2 className="sidebar-title">Categories</h2>
          <ul className="category-list">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`category-item ${
                  selectedCategory === cat ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content-wrapper">
          <div className="main-content">
            {/* Header */}
            <div className="header-container">
              <h1 className="store-title">Organic Store</h1>

              <div className="header-controls">
                {/* Search Bar */}
                <div className="search-container">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <button
                  className="view-cart-button"
                  onClick={() => setShowCart(!showCart)}
                >
                  <ShoppingCart className="cart-icon" />
                  <span>View Cart</span>
                  {productCart.length > 0 && (
                    <span className="cart-count">
                      {productCart.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image-container">
                    <img
                      alt={product.name}
                      src={
                        product.imageUrl ||
                        `https://source.unsplash.com/200x200/?${product.category},${product.name}`
                      }
                      className="product-image"
                    />
                    <div className="category-badge">
                      <span>{product.category}</span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="price-container">
                      <span className="current-price">₹{product.price}</span>
                    </div>
                    {renderCartButton(product)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="close-cart">
                <X size={20} />
              </button>
            </div>

            {productCart.length > 0 ? (
              <>
                <div className="cart-items-container">
                  {productCart.map((item) => (
                    <div key={item._id} className="cart-item">
                      <div className="cart-item-info">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="cart-item-image"
                        />
                        <div className="cart-item-details">
                          <h3 className="cart-item-name">{item.name}</h3>
                          <p className="cart-item-price">₹{item.price} each</p>
                        </div>
                      </div>
                      <div className="cart-item-controls">
                        <div className="cart-quantity-control">
                          <button
                            onClick={() => decrementCartItem(item._id)}
                            className="cart-quantity-button minus-button"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="cart-quantity-display">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementCartItem(item._id)}
                            className="cart-quantity-button plus-button"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <span className="cart-item-total">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          onClick={() => removeCartItem(item._id)}
                          className="remove-item-button"
                        >
                          <Trash className="trash-icon" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="total-container">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">₹{calculateTotal()}</span>
                  </div>

                  <button onClick={handleCheckout} className="checkout-button">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <ShoppingCart className="cart-icon-large" size={48} />
                </div>
                <p className="empty-cart-message">Your cart is empty</p>
                <p className="empty-cart-submessage">
                  Add some fresh products to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductManagement;

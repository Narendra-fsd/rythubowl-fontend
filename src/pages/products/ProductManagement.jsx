import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Trash, Plus, Minus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart: productCart } });
  };

  const calculateTotal = () => {
    return productCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  const getItemQuantity = (productId) => {
    const item = productCart.find((item) => item._id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCartButton = (product) => {
    const quantity = getItemQuantity(product._id);
    
    if (quantity === 0) {
      return (
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 px-4 bg-white border border-[#A68A64] text-[#A68A64] rounded-md font-medium text-sm hover:bg-[#F5F7F0] transition-colors"
        >
          Add to Cart
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between w-full bg-[#5A8F4F] text-white rounded-md overflow-hidden">
        <button 
          onClick={() => decrementCartItem(product._id)}
          className="px-3 py-2 hover:bg-[#3A5A40] transition-colors flex items-center justify-center"
        >
          <Minus size={14} />
        </button>
        <span className="px-3 py-2 font-medium text-sm bg-[#5A8F4F]">
          {quantity}
        </span>
        <button 
          onClick={() => incrementCartItem(product._id)}
          className="px-3 py-2 hover:bg-[#3A5A40] transition-colors flex items-center justify-center"
        >
          <Plus size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F7F0] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#3A5A40]">Organic Store</h1>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5F6D7E] w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E8EDDF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#5A8F4F] focus:border-[#5A8F4F]"
              />
            </div>
            
            <button 
              className="flex items-center gap-2 bg-[#5A8F4F] text-white px-4 py-2 rounded-md font-medium hover:bg-[#3A5A40] transition-colors"
              onClick={() => document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>View Cart</span>
              <span className="ml-2 bg-white text-[#5A8F4F] rounded-full px-2 py-1 text-xs font-bold">
                {productCart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm border border-[#E8EDDF] overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  alt={product.name}
                  src={`https://source.unsplash.com/400x300/?${product.category},organic,${product.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Discount badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-[#D4A017] text-white text-xs px-2 py-1 rounded-md font-bold">
                    20% OFF
                  </span>
                </div>
                {/* Category badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-[#3A5A40] text-white text-xs px-2 py-1 rounded-md">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-[#3A5A40] text-lg mb-1">{product.name}</h3>
                <p className="text-[#5F6D7E] text-sm mb-3 line-clamp-2 h-10">
                  {product.description}
                </p>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#3A5A40] font-bold text-lg">
                    ₹{product.price}
                  </span>
                  <span className="text-[#5F6D7E] text-sm line-through">
                    ₹{Math.round(product.price * 1.25)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                {renderCartButton(product)}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div id="cart-section" className="mb-12">
          {productCart.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EDDF] p-6">
              <h2 className="text-2xl font-bold mb-6 text-[#3A5A40]">Your Shopping Cart</h2>
              
              <div className="space-y-4 mb-6">
                {productCart.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 hover:bg-[#F5F7F0] rounded-lg transition-colors border-b border-[#E8EDDF] last:border-b-0"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={`https://source.unsplash.com/100x100/?${item.category},organic,${item.name}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-[#3A5A40]">{item.name}</h3>
                        <p className="text-[#5F6D7E] text-xs">₹{item.price} each</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-[#5A8F4F] text-white rounded-md overflow-hidden">
                        <button 
                          onClick={() => decrementCartItem(item._id)}
                          className="px-3 py-1 hover:bg-[#3A5A40] transition-colors flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 font-medium text-sm min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => incrementCartItem(item._id)}
                          className="px-3 py-1 hover:bg-[#3A5A40] transition-colors flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <span className="font-bold text-[#3A5A40] min-w-[80px] text-right">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                      
                      <button 
                        onClick={() => removeCartItem(item._id)}
                        className="text-[#ff4444] hover:text-[#cc0000] p-1"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-[#E8EDDF] pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-[#3A5A40]">Total:</span>
                  <span className="text-xl font-bold text-[#5A8F4F]">₹{calculateTotal()}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#5A8F4F] text-white py-3 px-6 rounded-md font-medium hover:bg-[#3A5A40] transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-[#E8EDDF]">
              <div className="text-[#5F6D7E] mb-4">
                <ShoppingCart className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-[#5F6D7E] text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-[#5F6D7E]">Add some fresh products to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
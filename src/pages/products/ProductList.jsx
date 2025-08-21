import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p._id} className="bg-white rounded-xl shadow-md p-4">
          <img
            src={p.imageUrl}
            alt={p.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-3">{p.name}</h2>
          <p className="text-gray-600">{p.description}</p>
          <p className="font-bold mt-2">
            ₹{p.price} / {p.unit}
          </p>
          <p className="text-sm text-gray-500">Stock: {p.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

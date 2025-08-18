import React, { useState, useEffect } from "react";

const ProductForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Fruits",
    price: "",
    unit: "kg",
    stock: "",
    availableFor: "Order",
    imageUrl: "",
    isActive: true,
    ...initialData,
  });

  useEffect(() => {
    setForm({ ...form, ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
      <select name="category" value={form.category} onChange={handleChange} className="input">
        <option>Fruits</option>
        <option>Vegetables</option>
        <option>Meat</option>
        <option>Eggs</option>
        <option>Juices</option>
        <option>Sprouts</option>
      </select>
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="input" />
      <select name="unit" value={form.unit} onChange={handleChange} className="input">
        <option>kg</option>
        <option>g</option>
        <option>litre</option>
        <option>piece</option>
        <option>packet</option>
      </select>
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="input" />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="input" />

      <select name="availableFor" value={form.availableFor} onChange={handleChange} className="input">
        <option>Order</option>
        <option>Subscription</option>
        <option>Both</option>
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default ProductForm;

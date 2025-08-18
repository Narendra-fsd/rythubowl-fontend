import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../redux/user/userThunks";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error, successMessage } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    addresses: [],
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        addresses: user.addresses || [],
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddressChange = (index, e) => {
    const newAddresses = [...form.addresses];
    newAddresses[index][e.target.name] = e.target.value;
    setForm({ ...form, addresses: newAddresses });
  };

  const addAddress = () => {
    setForm({
      ...form,
      addresses: [
        ...form.addresses,
        { street: "", city: "", state: "", zip: "", landmark: "" },
      ],
    });
  };

  const removeAddress = (index) => {
    const newAddresses = form.addresses.filter((_, i) => i !== index);
    setForm({ ...form, addresses: newAddresses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded"
          />

          {/* Addresses */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Addresses</h3>
            {form.addresses.map((addr, index) => (
              <div
                key={index}
                className="border p-3 rounded mb-3 bg-gray-50 relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="street"
                    value={addr.street}
                    onChange={(e) => handleAddressChange(index, e)}
                    placeholder="Street"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    value={addr.city}
                    onChange={(e) => handleAddressChange(index, e)}
                    placeholder="City"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="state"
                    value={addr.state}
                    onChange={(e) => handleAddressChange(index, e)}
                    placeholder="State"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={addr.zip}
                    onChange={(e) => handleAddressChange(index, e)}
                    placeholder="ZIP Code"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="landmark"
                    value={addr.landmark}
                    onChange={(e) => handleAddressChange(index, e)}
                    placeholder="Landmark"
                    className="border p-2 rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="absolute top-2 right-2 text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addAddress}
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              + Add Address
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;

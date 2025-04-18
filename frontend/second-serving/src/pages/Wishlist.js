import React, { useState } from 'react';

function Wishlist() {
  const [form, setForm] = useState({
    item: '',
    quantity: '',
    notes: '',
    urgency: 'Medium',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.item || !form.quantity) {
      setMessage('Item name and quantity are required.');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Wishlist submitted successfully!');
        setForm({ item: '', quantity: '', notes: '', urgency: 'Medium' });
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-hotRed p-6 flex justify-center items-center">
      <div className="bg-streetYellow p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-prussianBlue">Submit a Wishlist Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Item Name</label>
            <input
              type="text"
              name="item"
              value={form.item}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Urgency</label>
            <select
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-paleDog text-black font-bold w-full py-2 rounded hover:bg-yellow-400 transition"
          >
            Submit
          </button>

          {message && (
            <p className="mt-4 text-center text-pineGreen font-medium">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Wishlist;

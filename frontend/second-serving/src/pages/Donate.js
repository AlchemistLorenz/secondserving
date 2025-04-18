import React, { useState } from 'react';

function Donate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    location: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with Flask backend endpoint when we have it 
    const res = await fetch('https://second-serving-api.onrender.com/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Donation submitted successfully!');
      setFormData({ title: '', description: '', quantity: '', location: '' });
    } else {
      setMessage(data.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-hotRed flex flex-col items-center justify-center px-4 py-8">
      <img
        src={`${process.env.PUBLIC_URL}/secondServingLogo.png`}
        alt="Second Serving Logo"
        className="w-60 h-60 mb-5"
      />
      <div className="bg-paleDog p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-prussianBlue">Submit a Donation</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-selectiveYellow text-black font-bold py-2 px-4 rounded hover:bg-yellow-400"
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

export default Donate;

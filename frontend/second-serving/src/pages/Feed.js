import React, { useEffect, useState } from 'react';

function () {
    const [donations, setDonations] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        minQuantity: ''
    });

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const res = await fetch('https://second-serving-api.onrender.com/api/donations'); //replace with actual api
                const data = await res.json();
                setDonations(data);
                setFiltered(data);
            } catch (err) {
                console.error('Failed to load feed.');
            }
        };
        fetchDonations();
    }, []);

    useEffect(() => {
        let results = [..donations];

        if (filters.search) {
            results = results.filter(item =>
                item.title.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.location) {
            results = results.filter(item =>
                item.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.minQuantity) {
            results = results.filter(item => item.quantity >= parseInt(filters.minQuantity));
        }

        setFiltered(results);
    }, [filters, donations]);

    const handleChange = (e) => {
        setFilters({ ... filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-paleDog p-6 text-prussianBlue">
            <h2 classNme="text-3xl font-bold mb-4 text-center">Available Donations</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by title..."
                    onChange={handleChange}
                    value={filters.search}
                    className="p-2 rounded border"
                />

                <input 
                    type="text"
                    name="location"
                    placeholder="Filter by location..."
                    onChange={handleChange}
                    value={filters.location}
                    className="p-2 rounded border"
                />

                <input 
                    type="number"
                    name="minQuantity"
                    placeholder="Min quantity"
                    onChange={handleChange}
                    value={filters.minQuantity}
                    className="p-2 rounded border"
                />    
            </div>

            {/* Listing Feed */}
      <div className="grid gap-4">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Location:</strong> {item.location}</p>
              {/* Optional Claim button */}
              {/* <button className="mt-2 bg-selectiveYellow text-black px-4 py-1 rounded">Claim</button> */}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No matching donations found.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [donations, setDonations] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Replace with real auth later
  const userEmail = 'test@gmail.com';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [donationsRes, claimsRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_BASE}/api/my-donations?email=${userEmail}`),
          fetch(`${process.env.REACT_APP_API_BASE}/api/my-claims?email=${userEmail}`),
        ]);

        const donationsData = await donationsRes.json();
        const claimsData = await claimsRes.json();

        setDonations(donationsData);
        setClaims(claimsData);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-hotRed p-6 text-prussianBlue">
      <h2 className="text-3xl font-bold mb-4 text-center">My Dashboard</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* My Donations */}
          <div>
            <h3 className="text-xl font-semibold mb-2">📦 My Donations</h3>
            {donations.length > 0 ? (
              <ul className="space-y-2">
                {donations.map((donation, index) => (
                  <li key={index} className="bg-white p-4 rounded shadow">
                    <strong>{donation.title}</strong><br />
                    {donation.description}<br />
                    Quantity: {donation.quantity}<br />
                    Location: {donation.location}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No donations yet.</p>
            )}
          </div>

          {/* My Claims */}
          <div>
            <h3 className="text-xl font-semibold mb-2">🛒 My Claims</h3>
            {claims.length > 0 ? (
              <ul className="space-y-2">
                {claims.map((claim, index) => (
                  <li key={index} className="bg-white p-4 rounded shadow">
                    <strong>{claim.title}</strong><br />
                    Claimed from: {claim.donorEmail || 'Unknown'}<br />
                    Quantity: {claim.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No claims made yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

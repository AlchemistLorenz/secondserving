import React from 'react';

function MapView() {
    return (
        <div className="min-h-screen bg-hotRed p-6">
            <h2 className="text-3xl font-bold mb-4 text-center text-streetYellow">Shelter Drop-Off Map</h2>

            <div className="w-full max-w-4xl mx-auto">
                <iframe
                    title="Drop-off Locations"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.367008030238!2d-104.99153168462389!3d39.73923677944707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c78d23f22f9b5%3A0xf4ea6bcf47b1d6d3!2sDenver%20Rescue%20Mission!5e0!3m2!1sen!2sus!4v1684971998301!5m2!1sen!2sus"
                    width="100%"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    className="rounded shadow-md border border-gray-300"
                ></iframe>
                <p className="mt-4 text-center text-streetYellow text-sm">
                    This map shows nearby shelters where you can drop off your donations.
                </p>
            </div>
        </div>
    );
}

export default MapView;
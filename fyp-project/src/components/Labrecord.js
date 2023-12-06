import React, { useState } from 'react';

const Labrecord= () => {
    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Test and Labs Status:</h2>

            {/* Divider Line */}
            <hr className="my-4 border-t border-gray-300" />
coming soon...
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-600">{label}:</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
);

export default Labrecord;

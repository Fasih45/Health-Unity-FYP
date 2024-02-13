// NationalityDropdown.js
import React from 'react';

const NationalityDropdown = ({ value, onChange, error }) => {
  const nationalities = [
    "Select Nationality",
    "American",
    "British",
    "Canadian",
    "Pakistani",
    
    // Add more nationalities as needed
  ];

  return (
    <div className="mb-4 md:flex md:justify-between">
      <div className="mb-4 md:mr-2 md:mb-0">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="nationality">
          Nationality
        </label>
        <select
          className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
            error ? 'border-red-500' : ''
          }`}
          id="nationality"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {nationalities.map((nationality, index) => (
            <option key={index} value={nationality}>
              {nationality}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs italic text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default NationalityDropdown;

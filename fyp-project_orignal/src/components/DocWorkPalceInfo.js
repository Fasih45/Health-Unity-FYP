import React from "react";

const WorkInfoCard = ({ data }) => {
  const { currentHospital, currentClinic, workingdays, bio, description, specialty } = data;

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Workplace Info
      </h2>

      {/* Divider Line */}
      <hr className="my-4 border-t border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 space-y-5">
        <div>
          <p className="text-sm text-gray-600">Hospital Name:</p>
          <p className="text-lg font-semibold text-gray-800">
            {currentHospital}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Clinic Name:</p>
          <p className="text-lg font-semibold text-gray-800">
            {currentClinic}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Working Days:</p>
          <ul>
            {workingdays?.map((day, index) => (
              <li key={index} className="text-lg font-semibold text-gray-800">
                {day}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-600">Bio:</p>
          <p className="text-lg font-semibold text-gray-800 text-justify ">
            {bio}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Description:</p>
          <p className="text-lg font-semibold text-gray-800">
            {description}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Specialty:</p>
          <p className="text-lg font-semibold text-gray-800">
            {specialty}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkInfoCard;

import React, { useState } from "react";

const UserInfoCard = ({ data }) => {

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Personal Info
      </h2>

      {/* Divider Line */}
      <hr className="my-4 border-t border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.labName && <InfoItem label="LabName" value={data.labName} />}
        {data?.labLicense && <InfoItem label="LabLicense" value={data.labLicense} />}
        {data?.contactNumber && <InfoItem label="Contact NO. " value={data.contactNumber} />}
        {data?.fullName && <InfoItem label="Name" value={data.fullName} />}
        {data?.medicalLicenseNumber && (
          <InfoItem label="Lisence N0" value={data.medicalLicenseNumber} />
        )}
        {data?.dateOfBirth && (
          <InfoItem label="Age" value={calculateAge(data.dateOfBirth)} />
        )}
        {data?.username && <InfoItem label="Username" value={data.username} />}
        {data?.dateOfBirth && (
          <InfoItem label="Birth Date" value={formatDate(data.dateOfBirth)} />
        )}
        {data?.cnic && <InfoItem label="Cnic" value={data.cnic} />}
        {data?.nationality && <InfoItem label="Nationality" value={data.nationality} />}
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

export default UserInfoCard;

import React from 'react';

const UserInfoCard = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 25,
        username: 'johndoe123',
        dateOfBirth: 'January 1, 1998',
        nationality: 'American',
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Info</h2>

            {/* Divider Line */}
            <hr className="my-4 border-t border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                    <p className="text-sm text-gray-600">Name:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Email:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Age:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.age}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Username:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.username}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Date of Birth:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.dateOfBirth}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Nationality:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.nationality}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;

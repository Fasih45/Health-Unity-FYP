import React from 'react';

const WorkInfoCard = () => {
    const user = {
       clinicname:'Umar Medical',
       hospitalname:"Allided Hopital",
       selectedSpecialty:'Heart',
       customSpecialty:' ',
       workingdays:'"Tuesday","Wednesday"',
       bio:"i am doctor These words have identical meanings. The only difference is in their spelling. Specialty is by far the more popular choice in American English, so you should use it exclusively with American audiences. In British English, the words are roughly interchangeable.",
       description:"PHD form london"
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Work place Info</h2>

            {/* Divider Line */}
            <hr className="my-4 border-t border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 space-y-5">
                <div>
                    <p className="text-sm text-gray-600">HospitalName:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.hospitalname}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Specialty:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.selectedSpecialty}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Working Days:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.workingdays}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Bio:</p>
                    <p className="text-lg font-semibold text-gray-800 text-justify ">{user.bio}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Description:</p>
                    <p className="text-lg font-semibold text-gray-800">{user.description}</p>
                </div>
                
            </div>
        </div>
    );
};

export default WorkInfoCard;

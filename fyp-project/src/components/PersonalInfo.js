import React, { useState } from 'react';
import Select from 'react-select';

const PersonalInfo = ({ setcompleteprofilemain }) => {

    const weekdays = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' },
    ];

    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [hospitalname, sethospitalname] = useState('');
    const [customSpecialty, setCustomSpecialty] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [bio, setBio] = useState('');
    const [description, setDescription] = useState('');
    const [completeprofile, setcompleteprofile] = useState(false);
    const [clinicname, setclinicname] = useState('')

    const handleDaysChange = (selectedOptions) => {
        setSelectedDays(selectedOptions);
    };

    const handleSelectChange = (event) => {
        setSelectedSpecialty(event.target.value);
    };

    const handleCustomInputChange = (event) => {
        setCustomSpecialty(event.target.value);
    };
    const handlehospitalnameChange = (event) => {
        sethospitalname(event.target.value);
    };
    const handleclinicnameChange = (event) => {
        setclinicname(event.target.value);
    };


    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        var arr = []
        for (var i in selectedDays) {
            arr.push(selectedDays[i].value)
        }

        // Log form data to console
        console.log('Form Data:', {
            clinicname,
            hospitalname,
            selectedSpecialty,
            customSpecialty,
            arr,
            bio,
            description,
        });
        setcompleteprofilemain && setcompleteprofilemain((flag) => true);

    };

    return (
        <>
            {
                !completeprofile && <button onClick={() => setcompleteprofile(!completeprofile)} className="px-4 py-2 mt-5 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                    Complete Your profile
                </button>
            }


            {completeprofile &&
                <div className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                    <div className="container mx-auto p-4">
                        <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
                            <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Workplace Information</h1>
                            <hr className="my-4 border-t border-gray-300" />
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-4 mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Hospital Name"
                                        value={hospitalname}
                                        onChange={handlehospitalnameChange}
                                        className="border p-2 rounded w-full"
                                        required
                                    />

                                </div>
                                <div className="mb-4">
                                    <select
                                        value={selectedSpecialty}
                                        onChange={handleSelectChange}
                                        className="border p-2 rounded w-full"
                                    >
                                        <option value="" disabled>Select a Medical Specialty</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Dermatology">Dermatology</option>
                                        {/* Add other options */}
                                    </select>

                                    <input
                                        type="text"
                                        value={customSpecialty}
                                        onChange={handleCustomInputChange}
                                        placeholder="Enter your own specialty"
                                        className="border p-2 rounded mt-2 w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Select
                                        isMulti
                                        options={weekdays}
                                        placeholder="Select Working days"
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={selectedDays.value}
                                        onChange={handleDaysChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Clinic Name (Optional)"
                                        value={clinicname}
                                        onChange={handleclinicnameChange}
                                        className="border p-2 rounded w-full"
                                        
                                    />
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        value={bio}
                                        onChange={handleBioChange}
                                        placeholder="Bio"
                                        className="border p-2 rounded w-full h-24"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <textarea
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        placeholder="Description"
                                        className="border p-2 rounded w-full h-32"
                                        required
                                    />
                                </div>

                                <button type="submit" id="theme-toggle" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default PersonalInfo;

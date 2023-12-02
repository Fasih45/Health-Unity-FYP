import React from 'react';

const PersonalInfo = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto p-4">
                <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
                    <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Work place infomation</h1>
                    <hr className="my-4 border-t border-gray-300" />
                    <form>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <input type="text" placeholder="Hospital Name & Address" className="border p-2 rounded w-full" />
                            {/* <input type="text" placeholder="Last name" className="border p-2 rounded w-full" /> */}
                        </div>
                        <div className="mb-4">
                            <select className="border p-2  rounded w-full">
                                <option value="" disabled selected>Select a Medical Specialty</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Endocrinology">Endocrinology</option>
                                <option value="Gastroenterology">Gastroenterology</option>
                                <option value="Hematology">Hematology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Psychiatry">Psychiatry</option>
                                <option value="Radiology">Radiology</option>
                                <option value="Urology">Urology</option>
                                {/* Add more countries as needed */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <input type="text" placeholder="Street address" className="border p-2 rounded w-full" />
                        </div>
                        <div className="mb-4">
                            <input type="text" placeholder="City" className="border p-2 rounded w-full" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input type="text" placeholder="State / Province" className="border p-2 rounded w-full" />
                            <input type="text" placeholder="ZIP / Postal code" className="border p-2 rounded w-full" />
                        </div>
                        <div className="mb-4">
                            <textarea placeholder="Bio" className="border p-2 rounded w-full h-24" />
                        </div>
                        <div className="mb-6">
                            <textarea placeholder="Description" className="border p-2 rounded w-full h-32" />
                        </div>
                        <button type="button" id="theme-toggle" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                            Toggle Theme
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;

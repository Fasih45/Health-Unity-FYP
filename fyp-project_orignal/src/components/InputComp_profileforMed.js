import React, { useEffect, useState } from "react";
import Select from "react-select";
import Addtest from "./Addtest";

const InputComp_profileforMed = (props) => {
    const weekdays = [
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
        { value: "Sunday", label: "Sunday" },
    ];
    const [formData, setFormData] = useState({
        address: "",
        workingdays: [],
        test: []
    });
    const [formErrors, setFormErrors] = useState({
        address: false,
        workingdays: false,
        test: false,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDaysChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setFormData((prevData) => ({
            ...prevData,
            workingdays: selectedValues,
        }));
    };

    const handleTestChange = (updatedTest) => {
        // Update the test data in the parent component
        setFormData({
            ...formData,
            test: updatedTest
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check for errors
        const errors = {
            address: formData.address === "",
            workingdays: formData.workingdays.length === 0,
            test: formData.test.some(item => item.name === "" || item.cost === "")
        };

        setFormErrors(errors);

        // If there are errors, prevent form submission
        if (Object.values(errors).some(error => error)) {
            return;
        }

        console.log(formData);
        // Dispatch action to update the user info   
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto p-4">
                <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
                    <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Workplace Information
                    </h1>
                    <hr className="my-4 border-t border-gray-300" />
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                            <div className={`mb-4 ${formErrors.address ? 'border-red-500' : ''}`}>
                                <label className="block text-gray-800 font-bold mb-2" htmlFor="name">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    // className="border p-2 rounded w-full"
                                    className={`form-control border rounded py-2 px-3  ${formErrors.address ? "border-red-500 text-red-500" : ""
                            }`}
                                    
                                />
                                {formErrors.address && <p className="text-red-500 text-xs mt-1">Address is required</p>}
                            </div>
                            <div className={`mb-4 ${formErrors.workingdays ? 'border-red-500' : ''}`}>
                                <label className="block text-gray-800 font-bold mb-2" htmlFor="name">
                                    Working Days
                                </label>
                                <Select

                                    isMulti
                                    options={weekdays}
                                    placeholder="Select Working days"
                                    className={`basic-multi-select ${formErrors.workingdays ? "border-red-500 text-red-500" : ""}`}
                                    classNamePrefix="select"
                                    value={formData.workingdays.map((day) => ({
                                        value: day,
                                        label: day,
                                    }))}
                                    onChange={handleDaysChange}
                                />
                                {formErrors.workingdays && <p className="text-red-500 text-xs mt-1">Working days are required</p>}
                            </div>

                        </div>
                        {formErrors.test && <p className="text-red-500 text-center text-xs mt-1">Test Name and Cost should not be empty</p>}
                        <Addtest test={formData.test} onTestChange={handleTestChange} />
                        
                        <div className="flex justify-center pt-5">
                            <button
                                type="submit"
                                id="theme-toggle"
                                className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save Information
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputComp_profileforMed;

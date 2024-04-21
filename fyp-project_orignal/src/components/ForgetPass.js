import React from "react";
import image1 from './images/patient.jpg'
import docimage from './images/doc2.jpg'
import labimage from './images/mediclalabs.jpg'
import pharmacyimage from './images/pharmancy.jpg'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ForgetPass() {
    const { user } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
        verificationNumber: "",
    });
    const [flexchange, setflexchange] = useState({
        username: "",
        userdes: "",
        userimage: null
    });
    const [formFields, setFormFields] = useState({
        email: "",
    });
    useEffect(() => {

        if (user === 'patient') {
            console.log("userpatien :", user)
            setflexchange((prevstate) => ({
                ...prevstate,
                username: "Patient",
                userimage: image1,
                userdes: "Patients will use the platform to access and manage their personal medical data, view medical records, prescriptions, and collaborate with healthcare providers."

            }));
            console.log(flexchange.username)
        }
        else if (user === 'doctor') {
            setflexchange((prevstate) => ({
                ...prevstate,
                username: "Doctor",
                userimage: docimage,
                userdes: " Healthcare professionals such as doctors will use the platform to access patient records, make informed medical decisions, and collaborate with patients."
            }));
        }
        else if (user === 'medical_labs') {
            setflexchange((prevstate) => ({
                ...prevstate,
                username: "Medical Labs",
                userimage: labimage,
                userdes: " Medical laboratories and technicians will use the platform to input and share test results securely with authorized healthcare providers and patients."
            }));
        }
        else if (user === 'pharmacy') {
            setflexchange((prevstate) => ({
                ...prevstate,
                username: "Pharmacy",
                userimage: pharmacyimage,
                userdes: "  Pharmacies will integrate with the platform to provide real-time information on medication availability, receive prescriptions electronically, and fulfill patient medication needs."
            }));
        }
    }, [user]);

    useEffect(() => {
        console.log("formErrors", formErrors)
    }, [formErrors]);

    const handleInputChange = (fieldName, value) => {

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));

        // Update the state with the new input value
        setFormFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));
    };
    const validateForm = () => {
        let hasError = false;

        // Iterate over form fields and validate each one
        Object.keys(formFields).forEach((fieldName) => {
            const value = formFields[fieldName];
            const error = validateField(fieldName, value);

            // Update form errors
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: error,
            }));

            // Update the hasError flag
            if (error) {
                hasError = true;
            }
        });

        return hasError;
    };



    const validateField = (fieldName, value) => {
        let error = "";

        switch (fieldName) {
            case "email":
                error = !value
                    ? "Email is required"
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? "Invalid email format"
                        : "";
                break;
            case "password":
                const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{4,}$/;
                error = !passwordRegex.test(value)
                    ? "Password must contain at least one special character and one letter, and be at least four characters long."
                    : "";
                break;
            case "confirmPassword":
                error = !value
                    ? "Confirm Password is required"
                    : value !== formFields.password
                        ? "Passwords do not match"
                        : "";
                break;
            case "verificationNumber":
                const verificationNumberRegex = /^\d{6}$/;
                error = !verificationNumberRegex.test(value)
                    ? "Verification number must be a 6-digit number."
                    : "";
                break;

            default:
                break;
        }

        return error;
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validate all fields before submission
        const hasError = validateForm();

        // Check if any errors exist
        if (hasError) {
            return;
        }


    };

    return (
        <>
            <div className="">
                <div className="flex justify-center h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url(${flexchange.userimage})`, }}>
                        <div className="flex items-center h-full px-20  bg-opacity-40">
                            <div>
                                <h2 className="text-4xl font-bold text-white">{flexchange.username}</h2>
                                <p className={`max-w-xl mt-3 ${user === 'patient' || user === 'medical_labs' || user === 'pharmacy' ? 'text-white' : 'text-black'}`}>{flexchange.userdes}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                        <div className="flex-1">
                            <div className="text-center">
                                <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Remember your password?
                                    <Link
                                        to={`/${user}/signin`}
                                        className="text-blue-500 focus:outline-none focus:underline hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-8">

                                <form onSubmit={handleFormSubmit}>
                                    {Object.keys(formFields).map((fieldName) => (
                                        <div key={fieldName}>
                                            <label
                                                htmlFor={fieldName}
                                                className="block mb-2 text-sm text-gray-600 pt-3 dark:text-gray-200"
                                            >
                                                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}{" "}
                                                {/* Capitalize the first letter of the field name */}
                                            </label>

                                            <div className="relative">
                                                <input
                                                    type={fieldName === "password" ? showPassword ? "text" : "password" : "text"}
                                                    name={fieldName}
                                                    id={fieldName}
                                                    placeholder={`Enter your ${fieldName}`}
                                                    value={formFields[fieldName]}
                                                    className={`block w-full px-4 py-2 pr-12 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${formErrors[fieldName] ? "border-red-500" : ""
                                                        }`}
                                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                                />
                                                {fieldName === "password" && showPassword && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                            />
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                                {fieldName === "password" && !showPassword && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>

                                                    </button>
                                                )}
                                            </div>


                                            {formErrors[fieldName] && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {formErrors[fieldName]}
                                                </p>
                                            )}
                                        </div>
                                    ))}



                                    <div className="mt-6">

                                        <button
                                            type="submit"
                                            class="py-3 px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        >
                                            Verify
                                        </button>

                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ForgetPass;
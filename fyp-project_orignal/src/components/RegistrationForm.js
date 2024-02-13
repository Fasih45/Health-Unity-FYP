import React, { useState, useEffect } from "react";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import NationalityDropdown from "./NationalityDrop";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { register, registerRequest } from "../redux/actions/registerAction";
import { useDispatch, useSelector } from "react-redux";
import image1 from "./images/doc4.jpg";
import image2 from "./images/patient2.jpg";
import image3 from "./images/doctor2.jpg";
import image4 from "./images/pharmancy2.jpg";

const RegistrationForm = () => {
  const { user, username } = useParams();
  const location = useLocation();
  const errorSignup = useSelector((state) => state.regis.error);
  const successMessage = useSelector((state) => state.regis.successMessage);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [flexchange, setflexchange] = useState({
    userimage: null,
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    cnic: "",
    nationality: "",
    dateOfBirth: "",
    medicalLicenseNumber: "",
  });

  useEffect(() => {
    if (user === "patient") {
      setflexchange((prevstate) => ({
        ...prevstate,
        userimage: image2,
      }));
      console.log(flexchange.username);
    } else if (user === "doctor") {
      setflexchange((prevstate) => ({
        ...prevstate,
        userimage: image3,
      }));
    } else if (user === "medical_labs") {
      setflexchange((prevstate) => ({
        ...prevstate,

        userimage: image4,
      }));
    } else if (user === "pharmacy") {
      setflexchange((prevstate) => ({
        ...prevstate,
        userimage: image4,
      }));
    }
  }, [user]);

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    flatpickr("#dateOfBirth", {
      dateFormat: "Y-m-d",
      onChange: function (selectedDates) {
        setFormData((prevData) => ({
          ...prevData,
          dateOfBirth: selectedDates[0],
        }));
      },
    });
  }, []);
  useEffect(() => {
    return () => {
      // Reset states when the component is unmounted
      dispatch(registerRequest());
      console.log("Component unmounted");
    };
  }, [location, dispatch]);

  useEffect(() => {
    if (successMessage) navigate(`/${user}/signin`);
  }, [successMessage, navigate, user]);

  useEffect(() => {
    if (user === "patient")
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        cnic: "",
        nationality: "",
        dateOfBirth: "",
      });
    if (user === "doctor")
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        cnic: "",
        nationality: "",
        dateOfBirth: "",
        medicalLicenseNumber: "",
      });

    if (user === "medical_labs" || user === "pharmacy")
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        labName: "",
        labLicense: "",
        contactNumber: "",
      });
  }, [user]);

  const validateForm = (fieldName) => {
    let error = "";

    switch (fieldName) {
      case "username":
        error = !formData.username
          ? "Username is required"
          : !/^[A-Za-z][A-Za-z0-9]*$/.test(formData.username)
          ? "Username must start with an alphabet and can only contain alphabets and numbers"
          : formData.username.length < 4
          ? "Username must be at least 4 characters long"
          : "";
        break;
      case "email":
        error = !formData.email
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
          ? "Invalid email format"
          : "";
        break;
      case "password":
        error = !formData.password
          ? "Password is required"
          : formData.password.length < 4
          ? "Password must be at least 4 characters long"
          : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/.test(
              formData.password
            )
          ? ""
          : "Password must contain at least one letter, one digit, and one special character";
        break;
      case "confirmPassword":
        error = !formData.confirmPassword
          ? "Confirm Password is required"
          : formData.confirmPassword !== formData.password
          ? "Passwords do not match"
          : "";
        break;
      case "fullName":
        error = !formData.fullName
          ? "Full name is required"
          : !/^[A-Za-z ]+$/.test(formData.fullName)
          ? "Full name must contain only alphabets and spaces"
          : formData.fullName.length < 4
          ? "Full name must be at least 4 characters long"
          : "";
        break;
      case "cnic":
        error = !formData.cnic
          ? "CNIC is required"
          : !/^\d{13}$/.test(formData.cnic)
          ? "CNIC must be exactly 13 digits"
          : "";
        break;
      case "nationality":
        error =
          formData.nationality === "Select Nationality"
            ? "Nationality is required"
            : !formData.nationality
            ? "Nationality is required"
            : "";
        break;
      case "dateOfBirth":
        error = !formData.dateOfBirth ? "Date of birth is required" : "";
        break;
      case "medicalLicenseNumber":
        error = !formData.medicalLicenseNumber
          ? "Medical License Number is required"
          : /^(MD\d+|\d+MD)$/.test(formData.medicalLicenseNumber)
          ? ""
          : "Invalid Medical License Number try MD12345 or 12345MD";
        break;

      case "labName":
        if (!/^[A-Za-z]{4,}$/.test(formData.labName)) {
          error = "Lab Name must atleast 4 characters long and aplhabets";
        }
        break;
      case "labLicense":
        if (!formData.labLicense || !/^FPHRA\d+$/i.test(formData.labLicense)) {
          error = "Lab License must match the pattern FPHRA1234";
        }
        break;
      case "contactNumber":
        if (!/^(?:(\+92)|(0))?\d{10}$/.test(formData.contactNumber)) {
          error = "Invalid Pakistani phone number";
        }
        break;
      // Add additional cases for other fields as needed
      default:
        break;
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));

    // Return true if there are no errors, indicating a valid form
    return error === "";
  };

  const handleInputChange = (field, value) => {
    // Clear the error message for the corresponding field when the user starts typing
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));

    // Update the form data for the corresponding field
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    dispatch(registerRequest());
  };

  const handleSubmit = () => {
    let isValid = true;

    // Validate each field
    Object.keys(formData).forEach((field) => {
      isValid = validateForm(field) && isValid;
    });

    if (isValid) {
      dispatch(register(formData, user));
    }
  };

  return (
    <div
      className="h-full bg-gray-400 dark:bg-gray-900"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto  hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{ backgroundImage: `url(${flexchange.userimage})` }}
            ></div>

            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              {errorSignup && (
                <div class="">
                  <div class="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                    <svg
                      viewBox="0 0 24 24"
                      class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                    >
                      <path
                        fill="currentColor"
                        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                      ></path>
                    </svg>
                    <span class="text-red-800"> {errorSignup}. </span>
                  </div>
                </div>
              )}
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                {`Account Creation of ${
                  user ? user.charAt(0).toUpperCase() + user.slice(1) : null
                }`}
              </h3>

              <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                        formErrors.username ? "border-red-500" : ""
                      }`}
                      id="username"
                      type="text"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                    />
                    {formErrors.username && (
                      <p className="text-xs italic text-red-500">
                        {formErrors.username}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                        formErrors.email ? "border-red-500" : ""
                      }`}
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                    {formErrors.email && (
                      <p className="text-xs italic text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                {(user === "pharmacy" || user === "medical_labs") && (
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="labName"
                      >
                        Lab Name
                      </label>
                      <input
                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                          formErrors.labName ? "border-red-500" : ""
                        }`}
                        id="labName"
                        type="text"
                        placeholder="Lab Name"
                        value={formData.labName}
                        onChange={(e) =>
                          handleInputChange("labName", e.target.value)
                        }
                      />
                      {formErrors.labName && (
                        <p className="text-xs italic text-red-500">
                          {formErrors.labName}
                        </p>
                      )}
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="labLicense"
                      >
                        Lab License
                      </label>
                      <input
                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                          formErrors.labLicense ? "border-red-500" : ""
                        }`}
                        id="labLicense"
                        type="text"
                        placeholder="Lab License"
                        value={formData.labLicense}
                        onChange={(e) =>
                          handleInputChange("labLicense", e.target.value)
                        }
                      />
                      {formErrors.labLicense && (
                        <p className="text-xs italic text-red-500">
                          {formErrors.labLicense}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(user === "patient" || user === "doctor") && (
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <input
                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                          formErrors.fullName ? "border-red-500" : ""
                        }`}
                        id="fullName"
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                      />
                      {formErrors.fullName && (
                        <p className="text-xs italic text-red-500">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="cnic"
                      >
                        CNIC
                      </label>
                      <input
                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                          formErrors.cnic ? "border-red-500" : ""
                        }`}
                        id="cnic"
                        type="text"
                        placeholder="CNIC"
                        value={formData.cnic}
                        onChange={(e) =>
                          handleInputChange("cnic", e.target.value)
                        }
                      />
                      {formErrors.cnic && (
                        <p className="text-xs italic text-red-500">
                          {formErrors.cnic}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {user === "doctor" && (
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="medicalLicenseNumber"
                      >
                        Medical License Number
                      </label>
                      <input
                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                          formErrors.medicalLicenseNumber
                            ? "border-red-500"
                            : ""
                        }`}
                        id="medicalLicenseNumber"
                        type="text"
                        placeholder="Medical License Number"
                        value={formData.medicalLicenseNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "medicalLicenseNumber",
                            e.target.value
                          )
                        }
                      />
                      {formErrors.medicalLicenseNumber && (
                        <p className="text-xs italic text-red-500">
                          {formErrors.medicalLicenseNumber}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(user === "patient" || user === "doctor") && (
                  <div className="mb-4 md:flex md:justify-between">
                    <NationalityDropdown
                      value={formData.nationality}
                      onChange={(value) =>
                        handleInputChange("nationality", value)
                      }
                      error={formErrors.nationality}
                    />

                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="dateOfBirth"
                      >
                        Date of Birth
                      </label>
                      <input
                        id="dateOfBirth"
                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                          formErrors.dateOfBirth ? "border-red-500" : ""
                        }`}
                        type="text"
                        placeholder="Select Date of Birth"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                      />
                      {formErrors.dateOfBirth && (
                        <p className="text-xs italic text-red-500">
                          {formErrors.dateOfBirth}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {(user === "pharmacy" || user === "medical_labs") && (
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="contactNumber"
                    >
                      Contact Number
                    </label>
                    <input
                      className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                        formErrors.contactNumber ? "border-red-500" : ""
                      }`}
                      id="contactNumber"
                      type="text"
                      placeholder="Contact Number"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        handleInputChange("contactNumber", e.target.value)
                      }
                    />
                    {formErrors.contactNumber && (
                      <p className="text-xs italic text-red-500">
                        {formErrors.contactNumber}
                      </p>
                    )}
                  </div>
                )}
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                        formErrors.password ? "border-red-500" : ""
                      }`}
                      id="password"
                      type="password"
                      placeholder="******************"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                    />
                    {formErrors.password && (
                      <p className="text-xs italic text-red-500">
                        {formErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="c_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                        formErrors.confirmPassword ? "border-red-500" : ""
                      }`}
                      id="c_password"
                      type="password"
                      placeholder="******************"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                    />
                    {formErrors.confirmPassword && (
                      <p className="text-xs italic text-red-500">
                        {formErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center"></div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    href="./index.html"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getProfile } from "../redux/actions/docProfile";

const DocEditprofile = ({ oncancel, data }) => {
  const { username } = useParams();
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
    username: username,
    currentHospital: data.currentHospital,
    currentClinic: data.currentClinic,
    specialty: data.specialty,
    workingdays: data.workingdays,
    bio: data.bio,
    description: data.description,
    fee: data.fee,
  });

  // State variables to track validation status of each field
  const [fieldValidations, setFieldValidations] = useState({
    currentHospital: true,
    currentClinic: true,
    specialty: true,
    fee: true,
    bio: true,
    description: true,
  });

  const dispatch = useDispatch();

  const handleEdit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/profile/editdoc`,
        formData
      );
      dispatch(getProfile("doctor", username));
      alert("Profile updated");
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validate fee field
    if (name === "fee") {
      if (isNaN(Number(value)) || Number(value) <= 1) {
        Swal.fire(
          "Please enter a positive non-zero value for the fee.",
          "",
          "warning"
        );
        // Exit early if the value is not valid
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Reset validation status for the field
    setFieldValidations((prevValidations) => ({
      ...prevValidations,
      [name]: true,
    }));
  };

  const handleDaysChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      workingdays: selectedValues,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log(formData);
      handleEdit();
      oncancel();
    } else {
      Swal.fire("Please fill all the required fields.", "", "warning");
    }
  };

  const validateForm = () => {
    const validations = Object.keys(fieldValidations).map((field) => {
      if (
        field === "fee" &&
        (!formData[field] ||
          isNaN(Number(formData[field])) ||
          Number(formData[field]) <= 0)
      ) {
        return false;
      }
      if (!formData[field]) {
        return false;
      }
      return true;
    });
    return !validations.includes(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <div className=" mx-auto pt-4">
        <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
          <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Workplace Information
          </h1>
          <hr className="my-4 border-t border-gray-300" />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="currentHospital"
                placeholder="Current Hospital"
                value={formData.currentHospital}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="currentClinic"
                placeholder="Current Clinic"
                value={formData.currentClinic}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="" disabled>
                  Select a Medical Specialty
                </option>
                <option value="General Medicine">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Neurology">Neurology</option>
                <option value="Dentistry">Dentistry</option>
                <option value="Psychiatry">Psychiatry</option>
                {/* Add other options */}
              </select>
            </div>
            <div className="mb-4">
              <Select
                required
                isMulti
                options={weekdays}
                placeholder="Select Working days"
                className="basic-multi-select"
                classNamePrefix="select"
                value={formData.workingdays.map((day) => ({
                  value: day,
                  label: day,
                }))}
                onChange={handleDaysChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="fee"
                placeholder="fee"
                value={formData.fee}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
                // disabled={editIndex === index ? false : true} // Disable input if not in edit mode
              />
            </div>

            <div className="mb-4">
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="border p-2 rounded w-full h-24"
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded w-full h-32"
                required
              />
            </div>
          </form>
          <div class="flex gap-3 max-w-sm">
            <button
              onClick={oncancel}
              class="py-2.5 px-6 rounded-lg text-sm font-medium bg-teal-200 text-teal-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              class="py-2.5 px-6 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocEditprofile;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { registerDoctorProfile } from "../redux/actions/docProfile";

const PersonalInfo = (props) => {
  const weekdays = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];
  const dispatch = useDispatch();
  const { user } = props;

  const [formData, setFormData] = useState({
    username: user,
    currentHospital: "",
    currentClinic: "",
    specialty: "",
    workingdays: [],
    bio: "",
    description: "",
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

  const handleSweetfair = () => {
    let timerInterval;
    Swal.fire({
      title: "Just wait!",
      width:'21em',
      timer: 2500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // Swal.fire("Saved!", "", "success");
        Swal.fire({
          title: "Saved!",
          width:'20em',
          text: "Information is Saved :)",
          icon: "success"
        });
        console.log("I was closed by the timer");
      }
    });

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    
    dispatch(registerDoctorProfile(formData));
    props.reload();

    // Add your logic to submit the form data
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
            <div className="grid justify-items-center">
            <button
              type="submit"
              id="theme-toggle"
              onClick={handleSweetfair}
              className="flex items-center	px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
            >
              Save
            </button>

          </div>

          </form>
          



        </div>

      </div>


    </div>

  );
};

export default PersonalInfo;

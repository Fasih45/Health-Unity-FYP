import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAppointmentsRequest, registerAppointment } from "../redux/actions/appointmentAction";
import { useDispatch, useSelector } from "react-redux";

const BookAppointment = (props) => {
  const { username, fullname } = useParams();
  const error = useSelector((state) => state.appointment.error);
  const statuscode = useSelector((state) => state.appointment.statuscode);
  const docuser = props.docProfile;
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState("");
  const [formFields, setFormFields] = useState({
    doctorName: docuser.fullName,
    doctorSpeciality: docuser.specialty,
    hospital: docuser.currentHospital,
    patientName: fullname,
    checkupFee: docuser.fee,
    workingdays: docuser.workingdays,
    doctorUsername: docuser.username,
    patientUsername: username,
  });

  useEffect(() => {
    dispatch(getAppointmentsRequest());
    console.log(props.docProfile);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(getAppointmentsRequest());
    };
  }, [location,dispatch]);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setFormFields((prevFields) => ({
      ...prevFields,
      dayOfWeek: e.target.value,
    }));
    dispatch(getAppointmentsRequest());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAppointment(formFields));
    // Add logic to handle form submission
    console.log("Form submitted:", formFields);
    // You can submit the formFields data to your backend or perform other actions.
  };

  return (
    <>
      <div className="w-full bg-gray-300 flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] rounded-xl p-6 bg-white">
          {error && (
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
                <span class="text-red-800"> {error}. </span>
              </div>
            </div>
          )}
          <div className="flex justify-center p-5 font-bold">
            Book Appointment
          </div>
          <form onSubmit={handleSubmit}>
            {/* Doctor Name */}
            <div className="mb-5">
              <label
                htmlFor="doctorName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Doctor Name:
              </label>
              <input
                type="text"
                id="doctorName"
                value={formFields.doctorName}
                disabled
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Doctor Speciality */}
            <div className="mb-5">
              <label
                htmlFor="doctorSpeciality"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Doctor Speciality:
              </label>
              <input
                type="text"
                id="doctorSpeciality"
                value={formFields.doctorSpeciality}
                disabled
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Hospital */}
            <div className="mb-5">
              <label
                htmlFor="hospital"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Hospital:
              </label>
              <input
                type="text"
                id="hospital"
                value={formFields.hospital}
                disabled
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Patient Name */}
            <div className="mb-5">
              <label
                htmlFor="patientName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Patient Name:
              </label>
              <input
                type="text"
                id="patientName"
                value={formFields.patientName}
                disabled
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Checkup Fee */}
            <div className="mb-5">
              <label
                htmlFor="checkupFee"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Checkup Fee:
              </label>
              <input
                type="text"
                id="checkupFee"
                value={`Rs. ${formFields.checkupFee}`}
                disabled
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Select a Day */}
            <div className="mb-5">
              <label
                htmlFor="day"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Select a Day
              </label>
              <select
                id="day"
                name="day"
                value={selectedDay}
                onChange={handleDayChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              >
                <option value="" disabled>
                  Choose a day
                </option>
                {formFields.workingdays?.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            {/* Book Appointment Button */}
            <div className="flex justify-center ">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;

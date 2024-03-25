import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAppointmentsRequest,
  registerAppointment,
} from "../redux/actions/appointmentAction";
import { useDispatch, useSelector } from "react-redux";
import Hardhat from "./Hardhat";
import Loader from "./Loader";
import Swal from "sweetalert2";

const BookAppointment = (props) => {
  const { user, username, fullname } = useParams();
  const error = useSelector((state) => state.appointment.error);
  const statuscode = useSelector((state) => state.appointment.statusCode);
  const docuser = props.docProfile;
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState("");
  const navigate = useNavigate();
  const [specificState, setSpecificState] = useState(false);
  const [Apiwrite, setcall] = useState(false);
  const [formFields, setFormFields] = useState({
    doctorName: docuser.fullName,
    doctorSpeciality: docuser.specialty,
    hospital: docuser.currentHospital,
    patientName: fullname,
    checkupFee: docuser.fee,
    workingdays: docuser.workingdays,
    doctorUsername: docuser.username,
    bio: docuser.bio,
    patientUsername: username,
  });
  const [dayerror, setdayerror] = useState(false);
  const handleSave = () => {
    Swal.fire({
      title: "Payment Confirmed!",
      width: "20em",
      text: "Appoinment  has been Confirmed.",
      icon: "success",
    }).then(() => {
    });
  };
  const handledelet = () => {
    Swal.fire({
      title: "Error !",
      width: "20em",
      text: "Appoinment  has not  been Confirmed.",
      icon: "error",
    }).then(() => {
    });
  };

  useEffect(() => {
    dispatch(getAppointmentsRequest());
    console.log(props.docProfile);
  }, []);

  useEffect(() => {
    console.log("code:", statuscode);
    if (statuscode === 201) {
      navigate(`/welcome/${user}/${username}/${fullname}/noti`);
      dispatch(getAppointmentsRequest());
    }
  }, [statuscode]);

  useEffect(() => {
    if (Apiwrite === "yes") {
      dispatch(registerAppointment(formFields));
      setSpecificState(false);
      handleSave();
      setcall(false);

    } else if (Apiwrite === "no") {
      setSpecificState(false);
      handledelet();
      setcall(false);
    }
  }, [Apiwrite, dispatch, setSpecificState]);

  useEffect(() => {
    return () => {
      dispatch(getAppointmentsRequest());
    };
  }, [location, dispatch]);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setFormFields((prevFields) => ({
      ...prevFields,
      dayOfWeek: e.target.value,
    }));
    setdayerror(false);
    dispatch(getAppointmentsRequest());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDay.length === 0) {
      setdayerror(true);
      Swal.fire("Error!Please Select the Appoinmnet Day..", "", "warning");
      return
    }
    setSpecificState(true);
    // Add logic to handle form submission
    console.log("Form submitted:", formFields);
    // You can submit the formFields data to your backend or perform other actions.
  };

  return (
    <>
      <div className=" rounded-xl p-6 min-h-screen bg-white">
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

        <div className="p-5 border border-slate-300">
          <div className="flex justify-center p-5 font-bold">
            Book Appointment
          </div>

          <div className="pt-5 pl-4 grid  gap-7  md:grid-cols-2 sm:grid-cols-2">
            {/* Doctor Name */}
            <div className="mb-5 pl-5">
              <label
                htmlFor="doctorName"
                className="mb-3 block text-base font-semibold text-[#07074D]"
              >
                Doctor Name:
              </label>
              <p className="text-lg font-sm border border-inherit pl-5 text-gray-800">{formFields.doctorName} </p>
            </div>

            {/* Doctor Speciality */}
            <div className="mb-5 pl-5">
              <label
                htmlFor="doctorName"
                className="mb-3 block text-base font-semibold text-[#07074D]"
              >
                Doctor Speciality:
              </label>
              <p className="text-lg font-sm border border-inherit pl-5 text-gray-800">{formFields.doctorSpeciality}</p>

            </div>

            {/* Bio */}
            <div className="mb-5 pl-5">
              <label
                htmlFor="doctorName"
                className="mb-3 block text-base font-semibold text-[#07074D]"
              >
                Doctor Bio:
              </label>
              <p className="text-lg font-sm text-justify border border-inherit  p-2 text-gray-800">{formFields.bio}</p>

            </div>

            {/* Hospital */}
            <div className="mb-5 pl-5">
              <label
                htmlFor="doctorName"
                className="mb-3 block text-base font-semibold text-[#07074D]"
              >
                Hospital:
              </label>
              <p className="text-lg font-sm  pl-5 border border-inherit  text-gray-800">{formFields.hospital}</p>

            </div>

            {/* Patient Name */}
            <div className="mb-5 pl-5">
              <label
                htmlFor="doctorName"
                className="mb-3 block text-base font-semibold text-[#07074D]"
              >
                Patient Name:
              </label>
              <p className="text-lg font-sm  pl-5 border border-inherit  text-gray-800">{formFields.patientName}</p>

            </div>

            {/* Checkup Fee */}
            <div className="mb-5 pl-5">
              <label
                htmlFor="doctorName"
                className="mb-3 block text-base font-semibold text-[#07074D]"
              >
                Checkup Fee:
              </label>
              {/* <p className="text-lg font-sm border border-inherit  pl-5 text-gray-800">{`Rs. ${formFields.checkupFee}`}</p> */}
              <p className="text-lg font-sm border border-inherit  pl-5 text-gray-800">{`Rs.1000`}</p>

            </div>



          </div>
          {/* Select a Day */}
          <div className="mb-5 pl-7 max-w-sm">

            <label class="block mb-3 text-base font-semibold text-[#07074D]">
              Select a Appoinment Day:
            </label>
            <select
              id="day"
              name="day"
              value={selectedDay}
              onChange={handleDayChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">


              <option value='' disabled>Select a Day</option>
              {formFields.workingdays?.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            {dayerror && <p className="text-red-500 ml-5 text-xs italic">Please Select a Day</p>}
          </div>

          {/* Book Appointment Button */}
          <div className="flex justify-center ">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Book Appointment
            </button>
          </div>

        </div>




      </div>
      {specificState && (
        <Hardhat
          setcall={(message) => {
            setcall(message);
          }}
          setappointment={{
            value: true,
            doctorName: formFields.doctorUsername,
            FormData: formFields
          }}
        />
      )}
      {specificState && <Loader isLoading={specificState} />}
    </>
  );
};

export default BookAppointment;

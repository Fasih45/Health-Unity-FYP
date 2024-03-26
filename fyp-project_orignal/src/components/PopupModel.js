import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { registerAppointmentTiming } from "../redux/actions/appointmentAction";
import Hardhat from "./Hardhat";
import Loader from "./Loader";

function DatePicker1(props) {
  return (
    <div>
      <DatePicker {...props} />
    </div>
  );
}

// Input group component
function InputGroup6({
  label,
  name,
  value,
  onChange,
  type = "text",
  decoration,
  inputClassName = "",
  disabled,
}) {
  return (
    <div className="flex flex-row items-stretch w-full">
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={label}
        aria-label={label}
        className={`peer block w-full p-3 text-gray-600 bg-gray-100 border border-r-0 focus:border-red-400 focus:bg-white focus:outline-none focus:ring-0 appearance-none rounded-tr-none rounded-br-none rounded transition-colors duration-300 ${
          disabled ? "bg-gray-200" : ""
        } ${inputClassName}`}
        disabled={disabled}
      />
      <div className="flex items-center rounded-tl-none rounded-bl-none rounded pr-3 py-3 text-gray-600 bg-gray-100 border border-l-0 peer-focus:border-red-400 peer-focus:bg-white transition-colors duration-300">
        {decoration}
      </div>
    </div>
  );
}

// Custom Input Field component
const CustomInputField = forwardRef(
  (
    {
      name,
      value,
      label,
      onClick,
      disabled,
      inputClassName,
      icon = <BiCalendar size="1rem" />,
    },
    ref
  ) => (
    <button className="w-full " onClick={onClick} ref={ref} disabled={disabled}>
      <InputGroup6
        name={name}
        value={value}
        onChange={() => null}
        label={label}
        decoration={icon}
        disabled={disabled}
        inputClassName={inputClassName}
      />
    </button>
  )
);

export default function PopupModel({ visible, onclose, data }) {
  // State for selected date
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const statusCode = useSelector((state) => state.appointment.statusCode);
  const [specificState, setSpecificState] = useState(false);
  const [Apiwrite, setcall] = useState(false);
  const [Accept, setAccept] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (Apiwrite === "yes") {

      Accept?data.status = "Approved":data.status = "Rejected";
      dispatch(registerAppointmentTiming(data));
      setSpecificState(false);
      handleSave();
      setcall(false);
    } else if (Apiwrite === "no") {
      setSpecificState(false);
      handledelet();
      setcall(false);
    }
  }, [Apiwrite, dispatch, setSpecificState]);

  // State for selected time
  // const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Handler for time change
  const handleTimeChange = (selectedTime) => {
    // Format the time
    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Update the state with formatted time
    setTime(formattedTime);
    data.timing = formattedTime;
  };

  if (!visible) return null;

  const handleSave = () => {
    onclose();

    Swal.fire({
      title: "Success!",
      width: "20em",
      text: "Your operation is complted.",
      icon: "success",
    }).then(() => {
      // Call handleonclose function here
      // handleonclose(fieldid);
    });
  };
  const handledelet = (e) => {
    onclose();
    Swal.fire({
      title: "Rejected!",
      width: "20em",
      text: "Operation is Rejected",
      icon: "error",
    }).then(() => {
      // Call handleonclose function here
      // handleonclose(fieldid);
    });
  };
  const handlesumbit = () => {
    console.log("Api:", data);
    handleTimeChange(startDate);
    setSpecificState(true);
    setAccept(true);
    // onclose();
  };
  const handlesumbitForRejection = () => {
    console.log("Api:", data);
    setAccept(false);
    setSpecificState(true);
    // onclose();
  };

  return (
    <>
      <div
        id="container"
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="bg-white p-5 w-20em pt-2 rounded ">
          <h1 className="font-semibold text-center text-xl text-gray-700 p-3">
            Patient Detailed
          </h1>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
            <h6 className=" text-left text-xl text-gray-700">Name:</h6>
            <h6 className=" text-right text-xl text-gray-700">Age:</h6>
            <p className="text-left pl-10 text-gray-700 mb-5">
              {data.patientName}
            </p>

            <p className="text-right pl-20 text-gray-700 mb-5">{data.age}</p>

            <h6 className="ftext-left text-xl text-gray-700">Date:</h6>
            <h6 className="text-right text-xl text-gray-700">Status:</h6>
            <p className="text-left pl-10 text-gray-700 mb-5">
              {data.date.split("T")[0]}
            </p>

            <p className="text-right pl-20 text-gray-700 mb-5">{data.status}</p>
          </div>

          <div className="flex flex-col gap-8 bg-white p-5 sm:p-10 w-full rounded-md">
            {/* JSX content of DatepickerPresentationGroup */}
            <div className="space-y-2">
              <div className="font-semibold text-sm text-gray-700">
                Select Appoinment Timing:
              </div>
              {/* Datepicker component */}
              <DatePicker1
                selected={startDate}
                onChange={(date) => {
                  // Update the state with selected date
                  setStartDate(date);

                  handleTimeChange(date);
                }}
                customInput={
                  <CustomInputField name="name" label="Select date" />
                }
                startDate={startDate}
                popperPlacement="bottom"
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm aa"
              />
            </div>
          </div>

          <div className="text-center grid grid-cols-3 gap-2 md:grid-cols-3">
            <button
              onClick={handlesumbit}
              className="px-5 py-2 bg-[#3085d6]  text-white rounded"
            >
              Approve
            </button>
            <button
              onClick={handlesumbitForRejection}
              className="px-5 py-2 bg-[#d33] text-white rounded"
            >
              Reject
            </button>
            <button
              onClick={onclose}
              id="container1"
              className="px-5 py-2 bg-gray-700 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {specificState && (
        <Hardhat
          setcall={(message) => {
            setcall(message);
          }}
          acceptAppointment={{
            value: Accept,
            patientName: data.patientUsername,
            doctorName: data.doctorUsername,
            timing:data.timing,
            dayOfWeek:data.date,
            doctorUsername: data.doctorUsername,

          }}
        />
      )}
      {specificState && <Loader isLoading={specificState} />}
    </>
  );
}

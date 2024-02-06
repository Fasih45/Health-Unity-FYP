import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendar } from "react-icons/bi";

// Custom Datepicker component
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

// Main DatePicker Presentation component
function DatePicker1Presentation() {
  // State for selected date
  const [startDate, setStartDate] = useState(new Date());
  
  // State for selected time
  const [time, setTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  
  // Handler for time change
  const handleTimeChange = (selectedTime) => {
    // Format the time
    const formattedTime = selectedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Update the state with formatted time
    setTime(formattedTime);
    
    // Log the selected time
    console.log("Selected Time:", formattedTime);
  };

  return (
    <div className="flex flex-col gap-8 bg-white p-5 sm:p-10 w-full rounded-md">
      {/* JSX content of DatepickerPresentationGroup */}
      <div className="space-y-2">
        <div className="font-semibold text-sm text-gray-700">Time picker</div>
        {/* Datepicker component */}
        <DatePicker1
          selected={startDate}
          onChange={(date) => {
            // Update the state with selected date
            setStartDate(date);
            
            // Handle time change
            handleTimeChange(date);
          }}
          customInput={<CustomInputField name="name" label="Select date" />}
          startDate={startDate}
          popperPlacement="bottom"
          showTimeSelect
          showTimeSelectOnly
          dateFormat="h:mm aa"
        />
      </div>
    </div>
  );
}

// Exporting the component
export default DatePicker1Presentation;

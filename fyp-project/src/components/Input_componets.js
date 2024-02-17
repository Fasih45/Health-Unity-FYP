import React from "react";
import Select from "react-select"; // Import the react-select library

export default function Input_components({
  dataform,
  handle,
  index,
  deleteFunction,
  totalForms,
  errorsdata,
}) {
  const weekdays = [
    { value: "Morning", label: "Morning" },
    { value: "Evening", label: "Evening" },
    { value: "Night", label: "Night" },
  ];

  const handleSelectedOptions = (selectedOptions) => {
    const selectedTimings = selectedOptions.map((option) => option.value);
    handle({ target: { name: "timing", value: selectedTimings } }, index);
  };

  return (
    <>
      <div class="bg-gray-100 p-6 rounded-md shadow-md">
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="p-2">
                <input
                  type="text"
                  className={`form-input border rounded py-2 px-3 w-full ${errorsdata[0].medcinename
                    ? "border-red-500 text-red-500"
                    : ""
                    }`}
                  id="inputmedcinename"
                  name="medcinename"
                  placeholder="Medicine Name"
                  value={dataform.medcinename}
                  onChange={handle}
                />
                
              </td>
              <td class="p-2 ">
                {/* Multi-select dropdown for timings */}
                <Select
                  isMulti
                  options={weekdays}
                  id="inputtiming"
                  type='text'
                  value={dataform.timing.map(timing => ({ value: timing, label: timing }))}
                  name="timing"
                  class={`max-w-30px max-h-20px ${errorsdata[0].timing ? "border-red-500 text-red-500" : "fill day"}`}
                  placeholder="Select Timings"
                  onChange={handleSelectedOptions}
                />
                
              </td>


              <td className="p-2">
                <input
                  type="number"
                  className={`form-input border rounded py-2 px-3 w-full ${errorsdata[0].doz ? "border-red-500 text-red-500" : ""
                    }`}
                  id="inputdoz"
                  name="doz"
                  placeholder="Doz in MG"
                  value={dataform.doz}
                  onChange={handle}
                />
              </td>
              <td className="p-2">
                {totalForms > 1 ? (
                  <button
                    onClick={deleteFunction}
                    type="button"
                    className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

import React from "react";
import Select from "react-select";

export default function PresectionInput({
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
            <div className="flex justify-between flex-wrap -mx-6 mx-6">
                <div className="col-auto mb-6">
                    <input
                        type="text"
                        className={`form-control border rounded py-2 px-3  ${errorsdata[index].medcinename ? "border-red-500 text-red-500" : ""
                            }`}
                        id="medcinename"
                        name="medcinename"
                        placeholder="User Name"
                        value={dataform.medcinename}
                        onChange={handle}
                    />
                    {errorsdata[index].medcinename && (
                        <span className="text-danger">medcinename is required</span>
                    )}
                </div>
                <div className="col-auto mb-4">

                    <input
                        type="text"
                        // className="form-control border rounded py-2 px-3 "
                        className={`form-control border rounded py-2 px-3  ${errorsdata[index].doz ? "border-red-500 text-red-500" : ""
                            }`}
                        id="doz"
                        name="doz"
                        placeholder="doz"
                        value={dataform.doz}
                        onChange={handle}
                    />
                    {errorsdata[index].doz && (
                        <span className="text-danger">doz is required</span>
                    )}
                </div>
                <div className="col-auto mb-4">
                    <Select
                        isMulti
                        options={weekdays}
                        id="inputtiming"
                        type='text'
                        name="timing"
                        className={`form-control border rounded py-2 px-3  ${errorsdata[index].timing ? "border-red-500 text-red-500" : ""
                            }`}
                        placeholder="Select Timings"
                        onChange={handleSelectedOptions}
                    />
                    {errorsdata[index].timing && (
                        <span className="text-danger">timing is required</span>
                    )}
                </div>
                <div className="col-1 mb-4">
                    {totalForms > 1 ? (
                        <button
                            onClick={deleteFunction}
                            type="button"
                            className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    ) : null}
                </div>

            </div>

        </>
    );
}

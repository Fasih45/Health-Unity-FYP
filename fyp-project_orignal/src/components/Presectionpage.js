import React, { useState } from "react";
import PresectionInput from "./PresectionInput";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WritePriscription from "./WritePriscription";
import { createPrescription, getPrescription } from "../redux/actions/prescriptionAction";

const Presectionpage = ({priscriptionData,id}) => {
  const { user, username } = useParams();
  const [selectedTests, setSelectedTests] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const predefinedTests = ["Blood Test", "X-Ray", "MRI", "Ultrasound"];
  const [submitdata, setsubmitdata] = useState("");
  const list = useSelector((state) => state.patientPrescription.prescription);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([
    {
      medcinename: "",
      doz: "",
      timing: [],
    },
  ]);

  const [formErrors, setFormErrors] = useState([
    {
      medcinename: false,
      doz: false,
      timing: false,
    },
  ]);

  const handleDeleteTest = (index) => {
    const updatedTests = [...selectedTests];
    updatedTests.splice(index, 1);
    setSelectedTests(updatedTests);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setErrorMessage(""); // Clear error message when user types
  };
  const handleAddTest = () => {
    if (inputValue.trim() !== "") {
      if (!selectedTests.includes(inputValue.trim())) {
        setSelectedTests([...selectedTests, inputValue.trim()]);
        // console.log("SelectedTest : ",selectedTests)
        setInputValue(""); // Reset input value to empty string
      } else {
        setErrorMessage("This value already exists in the list.");
      }
    } else {
      setErrorMessage("Please enter a non-empty value.");
    }
  };

  const handleChangesubmitdata = (e) => {
    const { name, value } = e.target;
    setsubmitdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [name]: value,
    };

    const updatedFormError = [...formErrors];
    updatedFormError[index] = {
      ...updatedFormError[index],
      [name]: false,
    };
    setFormData(updatedFormData);
    setFormErrors(updatedFormError);
  };
  const addFunction = () => {
    setFormData((prevData) => [
      ...prevData,
      {
        medcinename: "",
        doz: "",
        timing: [],
      },
    ]);

    setFormErrors((prevErrors) => [
      ...prevErrors,
      {
        medcinename: false,
        doz: false,
        timing: false,
      },
    ]);
  };

  const deleteFunction = (index) => {
    setFormData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });

    setFormErrors((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let checkallErrors = 0;
    const updatedFormErrors = [...formErrors];

    for (let i = 0; i < formData.length; i++) {
      const { medcinename, doz, timing } = formData[i];
      let errors = { medcinename: false, doz: false, timing: false };
      // Check for empty fields
      if (medcinename.length<2) {
        errors.medcinename = true;
        checkallErrors = 1;
      }
      if (doz === "") {
        errors.doz = true;
        checkallErrors = 1;
      }
      if (timing.length === 0) {
        errors.timing = true;
        checkallErrors = 1;
      }

      if (Object.values(errors).includes(true)) {
        updatedFormErrors[i] = errors;
        setFormErrors(updatedFormErrors);
      } else {
        // Submit the form or perform further actions
      }
    }
    if (checkallErrors !== 1) {
      const data1 = submitdata;
      data1.writtenBydoctor = username;
      data1.predata = formData;
      data1.testbydoc=selectedTests;
      data1.id=id;
      data1.date=priscriptionData.date.split("T")[0];

      console.log("Submitted", data1);

      dispatch(createPrescription(data1));
    }
  };

  return (
    <div>
      <div className="container mx-auto bg-gray-100 p-5">
        <div className="mx-auto md:w-2/3">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-semibold">Patient Name:</h2>
              <h1 class="ml-11">{priscriptionData.patientName}</h1>
              <h2 class="font-semibold">Doctor Name :</h2>
              <h1 class="ml-11">{priscriptionData.doctorName}</h1>
            </div>
            <div>
              <h2 class="font-semibold">Patient Age:</h2>
              <h1 class="ml-11">{priscriptionData.age}</h1>
              <h2 class="font-semibold">Appoinment Date:</h2>
              <h1 class="ml-11">{priscriptionData.date.split("T")[0]}</h1>
            </div>
          </div>

          <hr className="my-7 border-t border-gray-300" />

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h2 class="font-semibold">Description:</h2>
              <textarea
                placeholder="Your Message"
                required
                className="w-full px-4 py-7 border-2 placeholder:text-neutral-800 dark:text-white dark:placeholder:text-neutral-200 dark:bg-neutral-900 rounded-md outline-none h-36 focus:ring-4 border-neutral-300 focus:border-neutral-600 ring-neutral-100 dark:border-neutral-600 dark:focus:border-white dark:ring-0"
                name="des"
                value={submitdata.des}
                onChange={handleChangesubmitdata}
              />
            </div>

            <hr className="my-7 border-t border-gray-300" />

            <div className="mt-8 mb-3 text-center">
              <button
                onClick={addFunction}
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Medicine
              </button>
            </div>
            {formData.map((data, index) => (
              <PresectionInput
                key={index}
                totalForms={formData.length}
                dataform={data}
                index={index}
                errorsdata={formErrors}
                deleteFunction={() => deleteFunction(index)}
                handle={(e) => handleChange(e, index)}
              />
            ))}

            <hr className="my-7 border-t border-gray-300" />
            <div class="max-w-70 m-3 p-2 my-5">
              <div class="flex ">
                <label htmlFor="medicalTest">
                  Choose or enter medical tests:
                </label>
                <input
                  type="text"
                  id="medicalTest"
                  value={inputValue}
                  onChange={handleInputChange}
                  list="medicalTests"
                  placeholder="Enter or select medical tests (separate by comma)"
                  style={{
                    width: "50%",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginLeft: "10px",
                    padding: "5px",
                  }}
                />
                <datalist id="medicalTests">
                  {predefinedTests.map((test, index) => (
                    <option key={index} value={test} />
                  ))}
                </datalist>

                <button
                  onClick={handleAddTest}
                  type="button"
                  className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  ADD
                </button>
              </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div>
                {selectedTests.map((test, index) => (
                  <span key={index}>
                    {test}
                    <button
                      class="rounded-full hover:bg-blue-700 mx-2 my-2"
                      onClick={() => handleDeleteTest(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleDeleteTest(index)}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>{" "}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Presectionpage;

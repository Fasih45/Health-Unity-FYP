import React, { useEffect, useState } from "react";
import Select from "react-select";
import PresectionInput from "./PresectionInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WritePriscription from "./WritePriscription";
import {
  createPrescription,
  getPrescription,
  setkeypair,
} from "../redux/actions/prescriptionAction";
import Swal from "sweetalert2";

const Presectionpage = ({ priscriptionData, id }) => {

  const { user, username } = useParams();
  const [selectedTests, setSelectedTests] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const predefinedTests = ["Blood Test", "X-Ray", "MRI", "Ultrasound"];
  const [error, setError] = useState(false);
  const [des, setdes] = useState("");
  const navigate = useNavigate();
  const statusCode = useSelector(
    (state) => state.patientPrescription.statusCode
  );
  const dispatch = useDispatch();
  const Doztiming = [
    { value: "Morning", label: "Morning" },
    { value: "Evening", label: "Evening" },
    { value: "Night", label: "Night" },
  ];
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

  const handleSave = () => {
    Swal.fire({
      title: "Success!",
      width: "20em",
      text: "Prescription is saved :)",
      icon: "success",
    }).then(() => {
      // Call handleonclose function here
      // handleonclose(fieldid);
    });
  };
  useEffect(() => {
    if (statusCode === 201) {
      handleSave();
      dispatch(setkeypair(id));
      navigate(`Patientrecord`);

    }
  }, [statusCode]);
  useEffect(() => {
    console.log("Data:", priscriptionData)
  }, [priscriptionData]);

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


  const handleDesChange = (e) => {
    setdes(e.target.value);
    setErrorMessage(""); // Clear error message when user types
  };


  useEffect(() => { console.log("Form Data:", formData) }, [formData]);

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
    setError(false);
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

  const handleSubmit = () => {

    let checkallErrors = 0;
    const updatedFormErrors = [...formErrors];

    if (des === "") {
      checkallErrors = 1;
      setErrorMessage("Please enter a description");
      return;
    }

    for (let i = 0; i < formData.length; i++) {
      const { medcinename, doz, timing } = formData[i];
      let errors = { medcinename: false, doz: false, timing: false };
      // Check for empty fields
      if (medcinename.length < 2) {
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
        setError(true);
      } else {
        // Submit the form or perform further actions
      }
    }


    if (checkallErrors !== 1) {
      const data1 = {
        writtenBydoctor: username,
        predata: formData,
        testbydoc: selectedTests,
        id: id,
        des: des,
        appointmentid: priscriptionData._id,
        date: priscriptionData.date.split("T")[0],
      };
      console.log("Submitted", data1);
      // const data1 = submitdata;
      // data1.writtenBydoctor = username;
      // data1.predata = formData;
      // data1.testbydoc = selectedTests;
      // data1.id = id;
      // data1.appointmentid = priscriptionData._id
      // data1.date = priscriptionData.date.split("T")[0];
      // console.log("Submitted", data1);
      dispatch(createPrescription(data1));
    }
  };



  const handleDaysChange = (selectedOptions, index) => {
    setError(false);
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index].timing = selectedOptions.map((option) => option.value);
      return updatedFormData;
    });
  };


  return (
    <div className=" bg-gray-100 p-5">
      <div className="">
        <div class="flex pl-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
          <div className="mb-4">
            <h2 class="font-semibold">Patient Name:</h2>
            <h1 class="ml-11">{priscriptionData.patientName}</h1>
          </div>
          <div className="mb-4">
            <h2 class="font-semibold">Doctor Name :</h2>
            <h1 class="ml-11">{priscriptionData.doctorName}</h1>
          </div>
          <div className="mb-4">
            <h2 class="font-semibold">Patient Age:</h2>
            <h1 class="ml-11">{priscriptionData.age}</h1>
          </div>
          <div className="mb-4">
            <h2 class="font-semibold">Appoinment Date:</h2>
            <h1 class="ml-11">{priscriptionData.date.split("T")[0]}</h1>
          </div>
        </div>

        <hr className="my-7 border-t border-gray-300" />

        <div className="mb-3">
          <h2 class="font-semibold">Description:</h2>
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-7 border-2 placeholder:text-neutral-800 dark:text-white dark:placeholder:text-neutral-200 dark:bg-neutral-900 rounded-md outline-none h-36 focus:ring-4 border-neutral-300 focus:border-neutral-600 ring-neutral-100 dark:border-neutral-600 dark:focus:border-white dark:ring-0"
            name="des"
            value={des}
            onChange={handleDesChange}
          />
        </div>

        <div className="flex justify-center items-center text-center ">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>


        <hr className="my-7 border-t border-gray-300" />

        <div className="flex justify-center items-center">
          <div className="flex text-center p-5">
            {error && <div className="text-red-500">Please fill in all required fields.</div>}
          </div>
        </div>


        <div className="-mx-4  px-4 sm:px-8 py-4 overflow-x-auto overflow-y-auto">
          <div className="inline-block min-w-full shadow rounded-lg ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                {/* Table header */}
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicine Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicine Doz
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timings
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              
                {formData?.map((item, index) => (
                 
                  <tr key={index} className={`border-b hover:bg-blue-100 bg-white`}>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        name="medcinename"
                        placeholder="Medicine Name"
                        value={item.medcinename}
                        className={`bg-transparent pl-1 border-b-2 border-gray-300 py-2  ${formErrors[index].medcinename ? "border-red-500 text-red-500" : ""
                          }`}
                      
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        name="doz"
                        placeholder="doz"
                        value={item.doz}
                        className={`bg-transparent pl-1 border-b-2 border-gray-300 py-2  ${formErrors[index].doz ? "border-red-500 text-red-500" : ""
                          }`}
                       
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    
                    <td className="p-3 px-5">
                      <Select
                        required
                        isMulti
                        options={Doztiming}
                        className={`bg-transparent border-b-2 border-gray-300 py-2 ${formErrors[index].timing ? "border-red-500 text-red-500" : ""}`}
                        classNamePrefix="select"
                        placeholder="Select Working days"
                        value={item.timing.map((day) => ({
                          value: day,
                          label: day,
                        }))}
                        onChange={(selectedOptions) => handleDaysChange(selectedOptions, index)}
                      />
                    </td>


                    <td className="p-3 px-5 flex justify-end">
                      {formData.length > 1 ? (
                        <button
                          onClick={() => deleteFunction(index)}
                          type="button"
                          className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={addFunction}
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Medicine
        </button>




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
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presectionpage;

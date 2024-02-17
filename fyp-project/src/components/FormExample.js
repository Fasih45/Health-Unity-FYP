import React, { useEffect, useState } from "react";
import Input_components from "./Input_componets";
import axios from "axios";

const FormExample = () => {
  const [selectedTests, setSelectedTests] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const predefinedTests = ["Blood Test", "X-Ray", "MRI", "Ultrasound"];
  const [flag,setflag]=useState(true);
  const initialState1 = [
    {
      des: "",
      testbydoc: [],
      predata: [],
    },
  ];
  const initialState2 = [
    {
      medcinename: "",
      doz: "",
      timing: [],
    },
  ];
  const [submitdata, setsubmitdata] = useState(initialState1);
  const [formData, setFormData] = useState(initialState2);
  useEffect(() => {
    const load = () => {
      const storedData1 = localStorage.getItem("submitdata");
      const storedData2 = localStorage.getItem("formData");
      const storedData3 = localStorage.getItem("selectedtest");
      setsubmitdata(storedData1 ? JSON.parse(storedData1) : initialState1);
      console.log("storedDate2",storedData2)
      setFormData(storedData2 ? JSON.parse(storedData2) : initialState2);
      setSelectedTests(storedData3? JSON.parse(storedData3) : []);

    };
    
    load(); // Call the load function directly
  }, []);
  
  useEffect(() => {
   if (!flag)
   {
    localStorage.setItem("submitdata", JSON.stringify(submitdata));
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("selectedtest", JSON.stringify(selectedTests));
    
    
   }
   else{
      setflag(false);
   }

  }, [submitdata, formData,selectedTests]);



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
        setInputValue(""); // Reset input value to empty string
      } else {
        setErrorMessage("This value already exists in the list.");
      }
    } else {
      setErrorMessage("Please enter a non-empty value.");
    }
  };

  const handleChangesubmit = (e) => {
    const { value } = e.target;
    setsubmitdata((prevData) => [
      {
        ...prevData[0], // Keep all properties of the first element unchanged
        des: value,     // Update only the 'des' property
      },
      // Keep the rest of the array unchanged
    ]);
    // console.log("des change: ", submitdata)
  };


  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [name]: value,
    };
    setFormData(updatedFormData);


    // Clear errors when user starts typing
    const updatedFormErrors = [...formErrors];
    updatedFormErrors[index] = {
      ...updatedFormErrors[index],
      [name]: false,
    };
    setFormErrors(updatedFormErrors);
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

    setFormErrors((prevData) => [
      ...prevData,
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

    // Check for errors
    const updatedFormErrors = formData.map((data) => {
      const errors = {
        medcinename: data.medcinename === "",
        doz: data.doz === "",
        timing: data.timing.length === 0,
      };
      return errors;
    });
    setFormErrors(updatedFormErrors);

    // Check if any error exists
    const hasErrors = updatedFormErrors.some((errors) =>
      Object.values(errors).includes(true)
    );

    if (!hasErrors) {
      const updatedSubmitData = [...submitdata];
      if (updatedSubmitData && updatedSubmitData.length != 0) {
        updatedSubmitData[0].predata = formData;
        updatedSubmitData[0].testbydoc = selectedTests;
        setsubmitdata(updatedSubmitData);
        console.log("Submitted Data", submitdata);
      }
    }
  };



  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="mx-auto md:w-2/3">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-semibold">Patient Name:</h2>
            <h1 class="ml-11">Zain Ali</h1>
            <h2 class="font-semibold">Patient :</h2>
            <h1 class="ml-11">Zain Ali</h1>

          </div>
          <div>
            <h2 class="font-semibold">Patient Age:</h2>
            <h1 class="ml-11">13</h1>
            <h2 class="font-semibold">Appoinment Date:</h2>
            <h1 class="ml-11">20/2/2000</h1>
          </div>

        </div>

        <hr className="my-7 border-t border-gray-300" />

        <div className="mb-3">
          <h2 class="font-semibold">Description:</h2>
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-7 border-2 placeholder:text-neutral-800 dark:text-white dark:placeholder:text-neutral-200 dark:bg-neutral-900 rounded-md outline-none h-36 focus:ring-4 border-neutral-300 focus:border-neutral-600 ring-neutral-100 dark:border-neutral-600 dark:focus:border-white dark:ring-0"
            name="des"
            value={submitdata[0].des}
            onChange={handleChangesubmit}
          />


        </div>
        <form onSubmit={handleSubmit}>
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
            <Input_components
              key={index}
              totalForms={formData.length}
              dataform={formData[index]}
              index={index}
              errorsdata={formErrors}
              deleteFunction={() => deleteFunction(index)}
              handle={(e) => handleChange(e, index)}
            />
          ))}

          <div class="max-w-70 m-3 p-2 my-5">
            <div class="flex ">
              <label htmlFor="medicalTest">Choose or enter medical tests:</label>
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
                  padding: "5px"
                }}
              />
              <datalist id="medicalTests">
                {predefinedTests.map((test, index) => (
                  <option key={index} value={test} />
                ))}
              </datalist>

              <button onClick={handleAddTest} type="button" className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">ADD</button>

            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div>
              {selectedTests.map((test, index) => (
                <span key={index}>
                  {test}
                  <button class="rounded-full hover:bg-blue-700 mx-2 my-2" onClick={() => handleDeleteTest(index)}><svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDeleteTest(index)} viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" />
                  </svg></button>{" "}
                </span>
              ))}
            </div>
          </div>


          <div className="text-center py-5 justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default FormExample;

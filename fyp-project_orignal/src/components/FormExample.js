import React, { useState } from "react";
import Input_components from "./Input_components";
import axios from "axios";

const FormExample = () => {
  const [formData, setFormData] = useState([
    {
      userName: "",
      email: "",
      phone: "",
    },
  ]);

  const [formErrors, setFormErrors] = useState([
    {
      userName: false,
      email: false,
      phone: false,
    },
  ]);

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
        userName: "",
        email: "",
        phone: "",
      },
    ]);

    setFormErrors((prevData) => [
      ...prevData,
      {
        userName: false,
        email: false,
        phone: false,
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
      const { userName, email, phone } = formData[i];
      let errors = { userName: false, email: false, phone: false };
      // Check for empty fields
      if (userName === "") {
        errors.userName = true;
        checkallErrors = 1;
      }
      if (email === "") {
        errors.email = true;
        checkallErrors = 1;
      }
      if (phone === "") {
        errors.phone = true;
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
      let data = {
        formData: formData,
      };
      console.log("Form submitted", JSON.stringify(data));
      (async () => {
        try {
          let token = localStorage.getItem("token");
          const parsedtoken = token ? JSON.parse(token) : [];
          const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
          const url = apiBaseUrl;

          const response = await axios.post(url, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedtoken}`,
            },
          });

          if (response.status === 201) {
            const jsonResponse = response.data;
            console.log("Response:", jsonResponse);
          } else {
            console.log("Error:", response.status);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      })();

      setFormData([
        {
          userName: "",
          email: "",
          phone: "",
        },
      ]);

      setFormErrors([
        {
          userName: false,
          email: false,
          phone: false,
        },
      ]);
    }
  };

  return (
    <div>
      <div className="mt-8 mb-3 text-center">
        <button onClick={addFunction} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </div>

      <div className="container mx-auto bg-gray-100 p-4">
        <div className="mx-auto md:w-2/3">
          <form onSubmit={handleSubmit}>
            {formData.map((data, index) => (
              <Input_components
                key={index}
                totalForms={formData.length}
                dataform={data}
                index={index}
                errorsdata={formErrors}
                deleteFunction={() => deleteFunction(index)}
                handle={(e) => handleChange(e, index)}
              />
            ))}
            <div className="text-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormExample;

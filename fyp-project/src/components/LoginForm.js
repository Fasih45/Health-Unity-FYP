import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  login,
  loginRequest,
  verification,
} from "../redux/actions/authActions";

const LoginForm = () => {
  const location = useLocation();
  const { user, username } = useParams();
  const dispatch = useDispatch();
  const errorLogin = useSelector((state) => state.auth.error);
  const statuscode = useSelector((state) => state.auth.statuscode);
  const loggedUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      // Reset states when the component is unmounted
      setFormFields({
        username: "",
        password: "",
      });

      setFormErrors({
        username: "",
        password: "",
      });
      dispatch(loginRequest()); //error reset

      console.log("Component unmounted");
    };
  }, [location, dispatch]);
  useEffect(() => {
    if (!errorLogin && statuscode === 200) {
      navigate(`/welcome/${user}/${formFields.username}/${loggedUser.fullName}`);
      dispatch(loginRequest());
      console.log(loggedUser);
    }
    if (errorLogin && statuscode === 401) {
      setFormFields({
        username: formFields.username,
        verificationNumber: "",
      });
    }
  }, [dispatch, errorLogin, loggedUser, navigate, statuscode, user]);

  const validateForm = () => {
    let hasError = false;

    // Iterate over form fields and validate each one
    Object.keys(formFields).forEach((fieldName) => {
      const value = formFields[fieldName];
      const error = validateField(fieldName, value);

      // Update form errors
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error,
      }));

      // Update the hasError flag
      if (error) {
        hasError = true;
      }
    });

    return hasError;
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "username":
        error =
          value.trim().length < 4
            ? "Username must be at least 4 characters."
            : "";
        break;
      case "password":
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{4,}$/;
        error = !passwordRegex.test(value)
          ? "Password must contain at least one special character and one letter, and be at least four characters long."
          : "";
        break;
      case "verificationNumber":
        const verificationNumberRegex = /^\d{6}$/;
        error = !verificationNumberRegex.test(value)
          ? "Verification number must be a 6-digit number."
          : "";
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (fieldName, value) => {
    // Clear the specific field's error when the input value changes
    dispatch(loginRequest()); //error reset
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));

    // Update the state with the new input value
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const hasError = validateForm();

    // Check if any errors exist
    if (hasError) {
      return;
    }

    // Perform your login logic here
    if (formFields.verificationNumber) {
      dispatch(verification(formFields, user));
    } else {
      dispatch(login(formFields, user));
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">Brand</h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                {errorLogin && (
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
                      <span class="text-red-800"> {errorLogin}. </span>
                    </div>
                  </div>
                )}

                <h1 className="text-5xl font-bold text-center text-gray-700 dark:text-white">
                  Welcome
                </h1>
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
                  {user ? user.charAt(0).toUpperCase() + user.slice(1) : null}
                </h2>
                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleFormSubmit}>
                  {Object.keys(formFields).map((fieldName) => (
                    <div key={fieldName}>
                      <label
                        htmlFor={fieldName}
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                      >
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}{" "}
                        {/* Capitalize the first letter of the field name */}
                      </label>
                      <input
                        type={fieldName === "password" ? "password" : "text"}
                        name={fieldName}
                        id={fieldName}
                        placeholder={`Enter your ${fieldName}`}
                        className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          formErrors[fieldName] ? "border-red-500" : ""
                        }`}
                        value={formFields[fieldName]}
                        onChange={(e) =>
                          handleInputChange(fieldName, e.target.value)
                        }
                      />
                      {formErrors[fieldName] && (
                        <p className="text-sm text-red-500 mt-1">
                          {formErrors[fieldName]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don't have an account yet?{" "}
                  <Link
                    to={`/${user}/signup`}
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

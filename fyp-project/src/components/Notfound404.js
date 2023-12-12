import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Notfound404() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will go back to the previous route
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="text-[120px] font-extrabold text-gray-700">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-6">Page Not Found</p>
        <button
          onClick={goBack}
          className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

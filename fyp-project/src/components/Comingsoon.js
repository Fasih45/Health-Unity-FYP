import React from "react";
import { useNavigate } from "react-router-dom";

export default function Comingsoon() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will go back to the previous route
  };
  return (
    <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 class="text-5xl text-white font-bold mb-8 animate-pulse">
        Coming Soon
      </h1>
      <p class="text-white text-lg mb-8">
        We're working hard to bring you something amazing. Stay tuned!
      </p>
      <button
        onClick={goBack}
        className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
      >
        Go Back
      </button>
    </div>
  );
}

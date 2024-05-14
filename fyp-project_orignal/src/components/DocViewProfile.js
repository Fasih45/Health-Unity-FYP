import React from "react";
import StarsRating from "./StarsRating";

const DocViewProfile = (props) => {
  const docuser = props.docProfile;
  const ratingvalue=docuser.rating;
  console.log("Rating value: ", docuser.rating.value);
  return (
    <>
      <div class="bg-gray-100">
        <div class="container mx-auto py-8">
          <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 h-full">
            <div class="col-span-4 sm:col-span-3">
              <div class="bg-white shadow rounded-lg p-6 h-full">
                <div class="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                    {docuser.fullName.charAt(0)}
                  
                  </div>
                  <h1 class="text-xl font-bold">{docuser.fullName}</h1>
                
                  <StarsRating stars={ratingvalue} />
                </div>
                <hr class="my-6 border-t border-gray-300" />
                <div class="flex flex-col">
                  <span class="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Specialization
                  </span>
                  <ul>
                    <li class="mb-2">{docuser.specialty}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-span-4 sm:col-span-9">
              <div class="bg-white shadow rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4">About Me</h2>
                <p class="text-gray-700 border p-2 border-current text-justify ">{docuser.bio}</p>
                <h2 class="text-xl font-bold mb-4 mt-4">Description</h2>
                <p class="text-gray-700 border p-2 border-current text-justify ">{docuser.description}</p>

                <h2 class="text-xl font-bold mt-6 mb-4">Workplace Info</h2>
                <div class="mb-6">
                  <div class="flex justify-between flex-wrap gap-2 w-full">
                    <span class="text-gray-700 font-bold">Hospital</span>
                  </div>
                  <p class="mt-2 border p-2 border-current">{docuser.currentHospital}</p>
                </div>
                <div class="mb-6">
                  <div class="flex justify-between flex-wrap gap-2 w-full">
                    <span class="text-gray-700 font-bold">Clinic</span>
                  </div>
                  <p class="mt-2 border p-2 border-current">{docuser.currentClinic}</p>
                </div>
                <div class="mb-6">
                  <div class="flex justify-between flex-wrap gap-2 w-full">
                    <span class="text-gray-700 font-bold">Working Days:</span>
                  </div>
                  <ul>
                    <li class="mb-2 border p-2 border-current ">
                      {docuser.workingdays
                        .map((item) => item.trim())
                        .join(", ")}
                    </li>
                  </ul>
                  
                </div>
                <div class="mb-6">
                  <div class="flex justify-between flex-wrap gap-2 w-full">
                    <span class="text-gray-700 font-bold">Appoinment Fee</span>
                  </div>
                  <p class="mt-2 border p-2 border-current">Rs. {docuser.fee}</p>
                </div>
                <div className="flex justify-start ">
                  <button
                    onClick={() => {
                      props.goBack();
                    }}
                    className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
                  >
                    Go Back
                  </button>
                </div>
                <div className="flex justify-center ">
                  {props.book ? (
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => {
                        props.book(docuser);
                        props.viewprofile(null); // Calls setbook(1)
                      }}
                    >
                      Book Appointment
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default DocViewProfile;

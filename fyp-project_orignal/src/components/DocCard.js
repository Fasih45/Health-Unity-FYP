import React, { useState } from "react";
import { useParams } from "react-router-dom";

const DocCard = (props) => {
 
  const profile = props.profile;
  return (
    <>
      <div>
        <div className="mb-6 min-h-40 rounded-lg bg-white p-6 mt-5 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-blue-100 duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                {!props.Medicallab
                  ? profile?.fullName?.charAt(0)
                  : profile?.labName?.charAt(0)}
              </div>

              <div>
                <h3 className="text-base  ml-2 font-semibold text-gray-900">
                  {!props.Medicallab
                    ? "Dr." + profile?.fullName
                    : profile?.labName}
                </h3>
                <span className="block  ml-2 text-xs font-normal text-gray-500">
                  {!props.Medicallab ? profile?.specialty : profile?.address}
                </span>
              </div>
            </div>
            <div>
              <div class="flex items-right">
                <svg
                  class="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                  4.95
                </p>
                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <a
                  href="#"
                  class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  73 reviews
                </a>
              </div>
            </div>
          </div>
          <p className="my-6  text-sm font-normal text-justify text-gray-500">
            {!props.Medicallab
              ? profile?.description
              : "|    " + "Contact No. " + profile?.personalInfo?.contactNumber}
          </p>
          <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
            <div className="flex">
              {!props.Medicallab ? (
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    props.viewprofile(profile); // Calls setbook(1)
                  }}
                >
                  View Profile
                </button>
              ) : (
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    // Calls setbook(1)
                    props.setViewProfileLab();
                  }}
                >
                  View Lab
                </button>
              )}
            </div>
            <div className="flex items-center">
              {!props.Medicallab ? (
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    props.book(profile); // Calls setbook(1)
                  }}
                >
                  Schulde Appoinment
                </button>
              ) : (
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    props.setaddlabtrust(profile?.username)
                  }}
                >
                  Add to Trusted List
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocCard;

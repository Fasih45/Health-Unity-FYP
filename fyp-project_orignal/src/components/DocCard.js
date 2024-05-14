import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StarsRating from "./StarsRating";


const DocCard = (props) => {

  const profile = props.profile;
  console.log("DocCard: ", profile);

  return (
    <>
      <div>
        <div className="mb-6 min-h-40 rounded-lg bg-white p-6 mt-5 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-blue-100 duration-500">
          {/* <div className="flex items-center justify-between"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
            <div className="flex">
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
            <div className="flex justify-end">
              {!props.Medicallab? profile?.rating?.value >0? <StarsRating stars={profile?.rating} />:<StarsRating stars={0} />: null}
            </div>

          </div>
          <p className="my-6  truncate text-sm font-normal text-justify text-gray-500">
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

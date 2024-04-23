// TableBody.js
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import PopupModel from "./PopupModel";
import { Rate } from "antd";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import WritePriscription from "./WritePriscription";
import "./StarStyle.css";
const TableBody = ({
  appointments,
  viewprofile,
  setWritePriscription,
  writePriscription,
  setPriscriptionData,
  setviewpatientPrescriptiondata,
}) => {
  const { user, username } = useParams();
  const [showmymodel, setshowmymodel] = useState(false);
  const [data, setData] = useState(null);
  const [Rating, setRating] = useState(0);
  const [showRating, setshowRating] = useState(false);
  const [Hover, setHover] = useState(null);
  const handleonclose = () => setshowmymodel(false);
  const [userRatings, setUserRatings] = useState([]);
  const updateUserRating = (username, rating) => {
    setUserRatings(prevRatings => ({
      ...prevRatings,
      [username]: rating
    }));
  };


  useEffect(() => {
    console.log("userRating", userRatings);
  }, [userRatings]);
  useEffect(() => {
    console.log("Data Appointment :", appointments);
  }, []);


  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              {appointment.date.split("T")[0]}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span
                class={`relative inline-block px-3 py-1 font-semibold
              ${appointment.status === "Settled"
                    ? "text-blue-900"
                    : appointment.status === "Approved"
                      ? "text-green-900"
                      : appointment.status === "Pending"
                        ? "text-orange-900"
                        : appointment.status === "Rejected"
                          ? "text-red-900"
                          : ""
                  }  leading-tight`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 ${appointment.status === "Settled"
                    ? "bg-blue-300" :
                    appointment.status === "Approved"
                      ? "bg-green-300"
                      : appointment.status === "Pending"
                        ? "bg-orange-300"
                        : appointment.status === "Rejected"
                          ? "bg-red-300"
                          : ""
                    } opacity-50 rounded-full`}
                ></span>

                <span class="relative">{appointment.status}</span>
              </span>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              <div className="flex items-center gap-x-2">
                <div className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                  {user === "patient"
                    ? appointment.doctorName.charAt(0)
                    : appointment.patientName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                    {user === "patient"
                      ? appointment.doctorName
                      : appointment.patientName}
                  </h2>
                </div>
              </div>
            </td>
            {user === "patient" ? (
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                {appointment.fee}
              </td>
            ) : (
              <td className="px-8 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <button
                    className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                    onClick={() => {
                      setWritePriscription();
                      setPriscriptionData(appointment);
                      setviewpatientPrescriptiondata(true);
                    }}
                  >
                    View MedicalRecord
                  </button>
                </div>
              </td>
            )}

            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              {appointment.status === "Approved" || appointment.status === "Settled"
                ? appointment.timing
                : "Not Assigned"}
            </td>
            {/* IF user is patient */}
            {user === "patient" && (
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <button
                    className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                    onClick={() => {
                      viewprofile(appointment.doctorUsername); // Calls setbook(1)
                    }}
                  >
                    View Doctor Profile
                  </button>
                  {appointment.status === "Settled" ? (
                    <button
                      className="text-blue-900 bg-blue-300 rounded-full relative inline-block px-3 py-1 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                      onClick={() => {
                        setshowRating(true);
                      }}
                    >
                      Give Rating
                    </button>
                  ) : <></>}

                </div>
              </td>
            )}

            {/* IF user is doctor */}
            {user === "doctor" && (
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  {appointment.status === "Approved" ? (
                    <button
                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-green-300 text-green-900   transition-colors duration-200 dark:hover:text-indigo-500 dark:text-white hover:text-indigo-500 focus:outline-none"
                      onClick={() => {
                        setWritePriscription();
                        setPriscriptionData(appointment);
                      }}
                    >
                      Write Priscription ......
                    </button>
                  ) : appointment.status === "Pending" ? (
                    <button
                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-[#1da1f2] text-white   transition-colors duration-200 dark:hover:text-indigo-500 dark:text-white hover:text-indigo-500 focus:outline-none"
                      onClick={() => {
                        setshowmymodel(true);
                        setData(appointment);
                      }}
                    >
                      Confirm appointment
                    </button>
                  ) : appointment.status === "Rejected" ? (
                    "rejected"
                  ) : (
                    ""
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
      {showRating ? (
        <div
          id="container"
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-white p-5 w-20em pt-2 rounded ">

            <div className="grid grid-cols-6 gap-2 ">
              <div className="col-start-2 col-span-4">
                <h1 className="font-semibold text-center text-xl text-gray-700 p-3">
                  {/* {appointments.doctorName} */}
                  Give Rating

                </h1>
              </div>
              <div className="flex justify-end ">
                <button type="button" 
                onClick={() => {setshowRating(false);} }
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span class="sr-only">Close menu</span>

                  <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

            </div>


            <div className="flex justify-center mt-6 m-5">
              <>
                <fieldset class="rate">
                  <input type="radio" id="rating10" name="rating" value="10" onClick={() => setRating(5)} /><label for="rating10" title="5 stars"></label>
                  <input type="radio" id="rating9" name="rating" value="9" onClick={() => setRating(4.5)} /><label class="half" for="rating9" title="4.5 stars"></label>
                  <input type="radio" id="rating8" name="rating" value="8" onClick={() => setRating(4)} /><label for="rating8" title="4 stars"></label>
                  <input type="radio" id="rating7" name="rating" value="7" onClick={() => setRating(3.5)} /><label class="half" for="rating7" title="3.5 stars"></label>
                  <input type="radio" id="rating6" name="rating" value="6" onClick={() => setRating(3)} /><label for="rating6" title="3 stars"></label>
                  <input type="radio" id="rating5" name="rating" value="5" onClick={() => setRating(2.5)} /><label class="half" for="rating5" title=" 2.5stars"></label>
                  <input type="radio" id="rating4" name="rating" value="4" onClick={() => setRating(2)} /><label for="rating4" title="2 stars"></label>
                  <input type="radio" id="rating3" name="rating" value="3" onClick={() => setRating(1.5)} /><label class="half" for="rating3" title="1.5 stars"></label>
                  <input type="radio" id="rating2" name="rating" value="2" onClick={() => setRating(1)} /><label for="rating2" title="1 star"></label>
                  <input type="radio" id="rating1" name="rating" value="1" onClick={() => setRating(0.5)} /><label class="half" for="rating1" title="0.5 star"></label>

                </fieldset>



              </>
            </div>
            <div className="flex justify-center p-3">

              <p>Your Rating Value is {Rating} </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  updateUserRating(username, Rating); // Update or set user rating
                  // setshowRating(false);
                }}
                className="px-2 py-2 bg-[#3085d6]  text-white rounded"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setshowRating(false);
                }}
                id="container1"
                className="px-2 py-2 bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <PopupModel onclose={handleonclose} visible={showmymodel} data={data} />
    </>
  );
};

export default TableBody;

// TableBody.js
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import PopupModel from "./PopupModel";
import { Rate } from "antd";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import WritePriscription from "./WritePriscription";
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
    console.log(appointments);
  }, []);

  useEffect(() => {
    console.log("Rating", Rating);
  }, [Rating]);
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
            <h1 className="font-semibold text-center text-xl text-gray-700 p-3">
              Patient Detailed
            </h1>
            <div className="flex justify-center mt-6 m-5">
              <>
                {Array.from({ length: 5 }).map((_, index) => {
                  // const ratingValue = (index * 0.5) + 0.5;
                  const ratingValue = (index + 1);
                  return (
                    <>
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          style={{ transform: 'scale(0.1)' }}
                          // className="hidden"
                          value={ratingValue}
                          onClick={() => {
                            setRating(ratingValue);
                          }}
                        />
                        <FaStar
                          className="cursor-pointer"
                          size={30}
                          color={ratingValue <= (Hover || Rating) ? "#ffc107" : "#e4e5e9"}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>



                    </>

                  );
                })}
                {/* <ul class="flex gap-2 justify-center">
                  <li
                    onClick={() => {
                      setRating(0.5);
                    }}
                  >
                    <svg class="w-10 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512">
                      <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm0-144c-33.6 0-65.2 14.8-86.8 40.6-8.5 10.2-7.1 25.3 3.1 33.8s25.3 7.2 33.8-3c24.8-29.7 75-29.7 99.8 0 8.1 9.7 23.2 11.9 33.8 3 10.2-8.5 11.5-23.6 3.1-33.8-21.6-25.8-53.2-40.6-86.8-40.6zm-48-72c10.3 0 19.9-6.7 23-17.1 3.8-12.7-3.4-26.1-16.1-29.9l-80-24c-12.8-3.9-26.1 3.4-29.9 16.1-3.8 12.7 3.4 26.1 16.1 29.9l28.2 8.5c-3.1 4.9-5.3 10.4-5.3 16.6 0 17.7 14.3 32 32 32s32-14.4 32-32.1zm199-54.9c-3.8-12.7-17.1-19.9-29.9-16.1l-80 24c-12.7 3.8-19.9 17.2-16.1 29.9 3.1 10.4 12.7 17.1 23 17.1 0 17.7 14.3 32 32 32s32-14.3 32-32c0-6.2-2.2-11.7-5.3-16.6l28.2-8.5c12.7-3.7 19.9-17.1 16.1-29.8z">
                      </path>
                    </svg>
                  </li>
                  <li
                    onClick={() => {
                      setRating(1);
                    }}
                  >
                    <svg class="w-10 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512">
                      <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z">
                      </path>
                    </svg>
                  </li>
                  <li
                    onClick={() => {
                      setRating(1.5);
                    }}
                  >
                    <svg class="w-10 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512">
                      <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z">
                      </path>
                    </svg>
                  </li>
                  <li
                    onClick={() => {
                      setRating(2);
                    }}
                  >
                    <svg class="w-10 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512">
                      <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z">
                      </path>
                    </svg>
                  </li>
                  <li
                    onClick={() => {
                      setRating(5);
                    }}
                  >
                    <svg class="w-10 text-cyan-500 hover:scale-105" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512">
                      <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z">
                      </path>
                    </svg>
                  </li>
                </ul> */}
              </>
            </div>
            <div className="flex justify-center">
              <p>Your Rating Value is {Rating}</p>
            </div>
            {/* <div className="m-3">

              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            </div> */}
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



      {/* {showRating ? (
        <div
          id="container"
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-white p-5 w-20em pt-2 rounded ">
            <h1 className="font-semibold text-center text-xl text-gray-700 p-3">
              Patient Detailed
            </h1>
            <div className="flex justify-center mt-6 m-5">
              <>
                {Array.from({ length: 5 }).map((_, index) => {
                  const ratingValue = (index * 0.5) + 0.5;
                  return (
                    <>
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          style={{ transform: 'scale(0.1)' }}
                          // className="hidden"
                          value={ratingValue}
                          onClick={() => {
                            setRating(ratingValue);
                          }}
                        />
                      </label>
                      {index === 0 && Rating === 0.5 ? (
                        <FaStarHalfAlt
                          className="cursor-pointer"
                          size={30}
                          color="#ffc107"
                        />
                      ) : index < Rating ? (
                        <FaStar
                          className="cursor-pointer"
                          size={30}
                          color="#ffc107"
                        />
                      ) : index - 0.5 === Rating ? (
                        <FaStarHalfAlt
                          className="cursor-pointer"
                          size={30}
                          color="#ffc107"
                        />
                      ) : (
                        <FaStar
                          className="cursor-pointer"
                          size={30}
                          color="#e4e5e9"
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      )}

                    </>

                  );
                })}
              </>
            </div>
            <div className="flex justify-center">
              <p>Your Rating Value is {Rating}</p>
            </div>
            <div className="flex justify-between">
              <button
                // onClick={handlesumbit}
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

      ) : null} */}



      <PopupModel onclose={handleonclose} visible={showmymodel} data={data} />
    </>
  );
};

export default TableBody;
